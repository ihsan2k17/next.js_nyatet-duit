'USE CLIENT'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'

interface IProvider {
    children: React.ReactNode
}

const Providers = ({children}: IProvider) => {
  return (
    <GoogleOAuthProvider clientId={process.env.PUBLIC_NEXT_GOOGLE_CLIENT_ID!} >
        {children}
    </GoogleOAuthProvider>
  )
}

export default Providers
