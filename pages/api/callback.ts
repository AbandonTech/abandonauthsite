import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from "cookie"
import process from 'process'

const ABANDONAUTH_URL: string = process.env.NEXT_PUBLIC_ABANDONAUTH_API_URL!
const DISCORD_REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET')
    return res
      .status(405)
      .json({ detail: 'invalid method' })

  const { code } = req.query

  // If multiple 'code' query parameters are provided, just use the first.
  const auth = Array.isArray(code) ? code[0] : code

  let discordReqBody = JSON.stringify({
    code: auth,
    redirect_uri: DISCORD_REDIRECT_URI
  })

  // Use AbandonAuth API to receive exchange token from Discord OAuth
  let abandonAuthDiscordResp = await fetch(
    `${ABANDONAUTH_URL}/discord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: discordReqBody
    },
  )

  if (abandonAuthDiscordResp.ok) {
    const exchangeToken  = (await abandonAuthDiscordResp.json()).token

    // Use AbandonAuth API to retrieve AbandonAuth user access token from exchange token
    let abandonAuthUserLoginResp = await fetch(
      `${ABANDONAUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${exchangeToken}`
        },
      },
    )

    if (abandonAuthUserLoginResp.ok) {
      const { token } = await abandonAuthUserLoginResp.json()

      if (token) {
        res.setHeader('Set-Cookie', serialize('Authorization', token, { path: '/' }))
        return res.redirect('/dashboard')
      }
    }
  }

  res.redirect('/')
}