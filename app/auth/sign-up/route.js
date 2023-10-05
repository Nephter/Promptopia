import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'localhost:3000',
      // emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  if (error) {
    console.log('error', error)
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return (
    console.log('data', data),

    NextResponse.redirect(
      `${requestUrl.origin}/login?message=Check email to continue sign in process`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    ))
}
