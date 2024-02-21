"use client";

import { useMemo } from "react";
import useSWR from "swr";

import { useAuthContext } from "@/auth/hooks";

import { getOrCreateVideoDraft } from "../videosService";

export const useGetOrCreateVideoDraft = () => {
    const auth = useAuthContext();

    const { data, isLoading, error, isValidating } = useSWR(
        auth.user?.accessToken,
        getOrCreateVideoDraft,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    );

    const memoizedResponse = useMemo(
        () => ({
            videoDraft: data,
            isVideoDraftLoading: isLoading,
            videoDraftError: error,
            isVideoDraftValidating: isValidating,
        }),
        [data, isLoading, error, isValidating]
    );

    return memoizedResponse;
};
