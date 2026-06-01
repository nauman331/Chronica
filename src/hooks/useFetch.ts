import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { apiURL } from "../utils/exports";
import type { RootState } from "../store/store";

type UseFetchOptions = {
    isAuth?: boolean;
};

const useFetch = (
    endpoint: string,
    { isAuth = false, }: UseFetchOptions = {},
) => {
    const token = useSelector((state: RootState) => state.auth.token);
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

                const res = await fetch(`${apiURL}${endpoint}`, {
                    method: "GET",
                    headers,
                    credentials: "include",
                });

                const json = await res.json();

                if (!res.ok) {
                    console.error("Fetch error response:", json);
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
        [endpoint, isAuth, token],
    );

    return { data, loading, refetch: fetchData };
};

export default useFetch;