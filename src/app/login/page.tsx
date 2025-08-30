import { GoogleOAuthProvider } from "@react-oauth/google"
import LoginPageClient from "./pageclient"



export const metadata = {
  title: "Login"
}
export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <LoginPageClient />
    </GoogleOAuthProvider>
  )
}
