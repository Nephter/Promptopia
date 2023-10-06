import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-config
export default NextAuth({
  // https://authjs.dev/reference/providers/oauth-builtin
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
})