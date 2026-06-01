import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { apiURL } from "../utils/exports";
import type { RootState } from "../store/store";
import Toast from 'react-native-toast-message';

type SubmitOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
};

const useSubmit = ({ isAuth = false }: { isAuth?: boolean } = {}) => {
    const token = useSelector((state: RootState) => state.auth.token);
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
                const headers: Record<string, string> = {
                    Accept: "application/json",
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

                const res = await fetch(`${apiURL}${endpoint}`, fetchOptions);
                const json = await res.json();

                if (!res.ok) {
                    let errorMsg = "Something went wrong";
                    let errorTitle = "Error";

                    // 1. Django 'fields' object (Prioritized)
                    if (json?.fields && typeof json.fields === "object") {
                        const firstErrorKey = Object.keys(json.fields)[0];
                        if (firstErrorKey && Array.isArray(json.fields[firstErrorKey])) {
                            const combinedErrors = json.fields[firstErrorKey].join(" ");
                            errorTitle = firstErrorKey.charAt(0).toUpperCase() + firstErrorKey.slice(1).replace('_', ' ');
                            errorMsg = combinedErrors;
                        }
                    }
                    // 2. Legacy 'errors' fallback
                    else if (json?.errors && typeof json.errors === "object") {
                        const firstErrorKey = Object.keys(json.errors)[0];
                        if (firstErrorKey && Array.isArray(json.errors[firstErrorKey])) {
                            errorTitle = firstErrorKey.charAt(0).toUpperCase() + firstErrorKey.slice(1);
                            errorMsg = json.errors[firstErrorKey].join(" ");
                        }
                    }
                    // 3. Fallback to 'message'
                    else if (json?.message && typeof json.message === "string") {
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
                        position: 'top', // Drops cleanly from the top of the modal
                        visibilityTime: 4000, // Gives user 4 seconds to read longer password errors
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
        [isAuth, token],
    );

    return { submit, loading, data };
};

export default useSubmit;