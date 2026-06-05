import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiURL } from "../utils/exports";
import type { RootState } from "../store/store";
import { login, logout } from "../store/slices/authSlice";
import Toast from 'react-native-toast-message';

type SubmitOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
};

const useSubmit = ({ isAuth = false }: { isAuth?: boolean } = {}) => {
    const { token, refresh: refreshToken, userdata } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<unknown>(null);

    const submit = useCallback(
        async (
            endpoint: string,
            body?: Record<string, unknown> | FormData,
            options: SubmitOptions = {},
        ) => {
            const { method = "POST" } = options;
            const isFormData = body instanceof FormData;

            setLoading(true);
            setData(null);

            try {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
                const headers: Record<string, string> = {
                    Accept: "application/json",
                    "X-Timezone": timezone,
                };

                if (!isFormData) {
                    headers["Content-Type"] = "application/json";
                }

                if (isAuth && token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const fetchOptions: RequestInit = {
                    method,
                    headers,
                    credentials: "include",
                };

                if (method !== "GET" && method !== "HEAD") {
                    fetchOptions.body = isFormData ? body : JSON.stringify(body ?? {});
                }

                let res = await fetch(`${apiURL}${endpoint}`, fetchOptions);
                let json = await res.json();

                if (res.status === 401 && refreshToken && isAuth) {
                    console.log("Token expired, attempting refresh...");

                    const refreshRes = await fetch(`${apiURL}auth/token/refresh`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Timezone': timezone,
                        },
                        body: JSON.stringify({ refresh: refreshToken })
                    });

                    if (refreshRes.ok) {
                        const refreshData = await refreshRes.json();
                        const newToken = refreshData.access || refreshData.token;
                        const newRefresh = refreshData.refresh || refreshToken;

                        dispatch(login({
                            token: newToken,
                            refresh: newRefresh,
                            userdata: userdata
                        }));

                        if (fetchOptions.headers) {
                            (fetchOptions.headers as Record<string, string>)["Authorization"] = `Bearer ${newToken}`;
                        }

                        res = await fetch(`${apiURL}${endpoint}`, fetchOptions);
                        json = await res.json();
                    } else {
                        console.log("Refresh token expired. Logging out.");
                        dispatch(logout());
                        Toast.show({
                            type: 'error',
                            text1: 'Session Expired',
                            text2: 'Please log in again to continue.',
                            position: 'top'
                        });
                        return null;
                    }
                }

                if (!res.ok) {
                    let errorMsg = "Something went wrong";
                    let errorTitle = "Error";

                    if (json?.fields && typeof json.fields === "object") {
                        const firstErrorKey = Object.keys(json.fields)[0];
                        if (firstErrorKey && Array.isArray(json.fields[firstErrorKey])) {
                            const combinedErrors = json.fields[firstErrorKey].join(" ");
                            errorTitle = firstErrorKey.charAt(0).toUpperCase() + firstErrorKey.slice(1).replace('_', ' ');
                            errorMsg = combinedErrors;
                        }
                    } else if (json?.errors && typeof json.errors === "object") {
                        const firstErrorKey = Object.keys(json.errors)[0];
                        if (firstErrorKey && Array.isArray(json.errors[firstErrorKey])) {
                            errorTitle = firstErrorKey.charAt(0).toUpperCase() + firstErrorKey.slice(1);
                            errorMsg = json.errors[firstErrorKey].join(" ");
                        }
                    } else if (json?.message && typeof json.message === "string") {
                        if (!json.message.includes("ErrorDetail")) {
                            errorMsg = json.message;
                        } else if (json?.error && typeof json.error === "string") {
                            errorMsg = json.error;
                        }
                    }

                    console.error("Submit API error:", errorMsg);
                    Toast.show({
                        type: 'error',
                        text1: errorTitle,
                        text2: errorMsg,
                        position: 'top',
                        visibilityTime: 4000,
                    });
                    return null;
                }

                setData(json);
                return json;
            } catch (err) {
                const message = err instanceof Error ? err.message : "Network error";
                Toast.show({
                    type: 'error',
                    text1: 'Network Error',
                    text2: message,
                    position: 'top',
                });
                console.error("Submit request error:", message);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [isAuth, token, refreshToken, userdata, dispatch],
    );

    return { submit, loading, data };
};

export default useSubmit;