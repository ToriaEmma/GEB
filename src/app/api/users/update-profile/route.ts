import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!serviceRoleKey) {
      return NextResponse.json({ error: 'La clé Service Role Supabase n\'est pas configurée.' }, { status: 500 });
    }

    // Identify the user making the request using SSR cookies
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '', {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {}
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }

    const updates: any = {};
    if (email) updates.email = email;
    if (password) updates.password = password;
    
    // We also set email_confirm to true so they don't have to verify the new email via a broken SMTP
    if (email) updates.email_confirm = true;

    // Use Admin API to force the update
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, updates);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
