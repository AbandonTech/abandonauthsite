import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import * as process from "process";

import CreateDeveloperApplication from "../types/createDeveloperApplication";

const ABANDON_AUTH_URL: string = process.env.NEXT_PUBLIC_ABANDONAUTH_API_URL!;

export default async function(redirectTo: string = '/'): Promise<CreateDeveloperApplication> {
    const authorization = cookies().get('Authorization')

    if (!authorization?.value)
        return redirect(redirectTo)

    const createAppResp = await fetch(
        `${ABANDON_AUTH_URL}/developer_application`,
        {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${authorization?.value}`,
            }
        }
    )

    const userApp: CreateDeveloperApplication = JSON.parse(await createAppResp.json())

    return userApp

    
}