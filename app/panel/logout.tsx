"use client";

import { useFetch } from "@yakad/lib";
import { Button } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cookies } from 'next/headers';
import deleteToken from "./removeCookie";
/**
 * Experimental future of JS
 */
export declare var cookieStore: any;

export default function Logout({ token }: { token: string }) {
    const router = useRouter();
    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/logout`,
        {
            method: "GET",
            headers: {
                Authorization: token,
            },
        }
    );

    useEffect(() => {
        // Check if logout was succesful
        if (fetch.response && fetch.response.status === 200) {
            deleteToken().then(() => {
                router.push("/account/login");
            });
        }
    }, [fetch.isResponseBodyReady]);

    return (
        <Button size="small" variant="tonal" onClick={fetch.send}>
            Logout
        </Button>
    );
}
