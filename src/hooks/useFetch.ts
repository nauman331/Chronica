import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiURL } from "../utils/exports";
import type { RootState } from "../store/store";
import { login, logout } from "../store/slices/authSlice";

type UseFetchOptions = {
    isAuth?: boolean;
};

const useFetch = (
    endpoint: string,
    { isAuth = false }: UseFetchOptions = {},
) => {
    const { token, refresh: refreshToken, userdata } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<unknown>(null);

    const fetchData = useCallback(
        async () => {
            setLoading(true);

            try {
                const headers: Record<string, string> = {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                };

                if (isAuth && token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const fetchOptions: RequestInit = {
                    method: "GET",
                    headers,
                    credentials: "include",
                };

                let res = await fetch(`${apiURL}${endpoint}`, fetchOptions);
                let json = await res.json();

                if (res.status === 401 && refreshToken && isAuth) {
                    console.log("Token expired during fetch, attempting refresh...");

                    const refreshRes = await fetch(`${apiURL}auth/token/refresh`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
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
                        console.error("Session expired. Please log in again.");
                        setData(null);
                        return;
                    }
                }

                if (!res.ok) {
                    let errorMsg = "Failed to fetch data";

                    if (json?.message && typeof json.message === "string") {
                        errorMsg = json.message;
                    } else if (json?.error && typeof json.error === "string") {
                        errorMsg = json.error;
                    }

                    console.error("Fetch API error:", errorMsg);
                    console.error("Full response:", res);

                    setData(null);
                    return;
                }

                setData(json);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Network error";
                console.error("Fetch request failed:", message);
            } finally {
                setLoading(false);
            }
        },
        [endpoint, isAuth, token, refreshToken, userdata, dispatch],
    );
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, refetch: fetchData };
};

export default useFetch;