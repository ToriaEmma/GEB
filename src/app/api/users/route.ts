import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(req: Request) {
  try {
    const { email, password, full_name, can_validate, can_read_messages, can_moderate_comments } = await req.json();

    if (!serviceRoleKey) {
      return NextResponse.json({ error: 'La clé Service Role Supabase n\'est pas configurée.' }, { status: 500 });
    }

    // 1. Create the user in Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true 
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // 2. Insert into profiles table with permissions
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert([
        {
          id: userId,
          full_name,
          role: 'BUSINESS_DEV',
          can_validate: !!can_validate,
          can_read_messages: !!can_read_messages,
          can_moderate_comments: !!can_moderate_comments
        }
      ]);

    if (profileError) {
      // Rollback user creation if profile insertion fails
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: authData.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
