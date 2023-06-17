import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from "cookie"
import process from 'process'

const ABANDONAUTH_URL: string = process.env.ABANDONAUTH_API_URL!
const DISCORD_REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET')
    return res
      .status(405)
      .json({ detail: 'invalid method' })

  const { code } = req.query

  // If multiple 'code' query parameters are provided, just use the first.
  const auth = Array.isArray(code) ? code[0] : code

  let reqBody = JSON.stringify({
    code: auth,
    redirect_uri: DISCORD_REDIRECT_URI
  })

  // Use AbandonAuth API to login with Discord OAuth
  let response = await fetch(
    `${ABANDONAUTH_URL}/discord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBody
    },
  )

  if (response.ok) {
    const { token } = await response.json()

    if (token) {
      res.setHeader('Set-Cookie', serialize('Authorization', token, { path: '/' }))
      return res.redirect('/dashboard')
    }
  }

  res.redirect('/')
}