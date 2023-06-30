import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import * as process from "process";

const ABANDON_AUTH_URL: string = process.env.NEXT_PUBLIC_ABANDONAUTH_API_URL!;

export default function (url: string, redirectTo: string = '/') {
    const authorization = cookies().get('Authorization')

    if (!authorization?.value)
        return redirect(redirectTo)

    return fetch(`${ABANDON_AUTH_URL}${url}`, {
        headers: {
            'Authorization': `Bearer ${authorization?.value}`,
        }
    })
}