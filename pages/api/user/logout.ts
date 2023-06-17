import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
 
export default async function deleteAuthCookie(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Set-Cookie', serialize('Authorization', 'deleted', { path: '/', expires: new Date(0) }))
    return res.redirect('/dashboard')
}