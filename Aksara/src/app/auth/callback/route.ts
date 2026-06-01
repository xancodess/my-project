import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '../../../../types/supabase'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${origin}/login`)
  }

  const cookieStore = await cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  let data = null
  let error = null

  for (let attempt = 0; attempt < 3; attempt++) {
    console.log('[auth/callback] attempt', attempt + 1, 'of 3')
    const result = await supabase.auth.exchangeCodeForSession(code)
    if (!result.error) {
      data = result.data
      break
    }
    error = result.error
    if (attempt < 2) {
      await new Promise(r => setTimeout(r, 500 * (attempt + 1)))
    }
  }

  if (!data) {
    console.error('[auth/callback] All attempts failed:', error)
    return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
  }

  const userId = data.user.id

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  const role = profile?.role
  if (role === 'instructor') {
    return NextResponse.redirect(`${origin}/dashboard/instructor`)
  }
  if (role === 'student') {
    return NextResponse.redirect(`${origin}/dashboard/student`)
  }
  return NextResponse.redirect(`${origin}/onboarding`)
}
