'use client';

import { useState } from 'react';
import useIsMobile from '@/hooks/ismobile';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoginMobile from './loginmobile';
import LoginDesktop from './logindesktop';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import jwt from "jsonwebtoken"



const LoginPageClient = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberme, setRememberme] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)
  const [alertLogin, setAlertLogin] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const isMobile = useIsMobile()
  const router = useRouter()

  const handleLogin = async () => {
    try{
      const res = await axios.post("/api/login", {
        username,
        password
      }, {withCredentials: true})
      setAlertLogin(true)
      setAlertMessage(res.data.message);
    } catch(error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setAlertMessage(error.response.data.message);
        setAlertLogin(true);
      } else {
        setAlertMessage("Server error, coba lagi nanti");
        setAlertLogin(true);
      }
    }
  }
  // const googleLogin = useGoogleLogin({
  //         onSuccess: async (CredentialResponse) => {
  //             console.log("Token Response:", CredentialResponse);
  //         },
  //         onError: () => {
  //             console.log("Login Failed");
  //         },
  //     });
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token Response:", tokenResponse);

      try {
        // Ambil user info dari Google pakai axios
        const { data: userInfo } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        console.log("User Info:", userInfo);
      } catch (err) {
        console.error("Gagal ambil user info:", err);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  const handleRegister = () => {
    console.log("Register Cuy")
  }


  const handleNav = () => {
    router.push ("/home")
  }

  return isMobile ?
    <LoginMobile 
        handleLogin={handleLogin} handleGoogleLogin={googleLogin} handleRegister={handleRegister} 
        name={name} setName={setName}
        username={username} setUsername={setUsername}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        rememberMe={rememberme} setRememberMe={setRememberme}
        modalLogin={modalLogin} setModalLogin={setModalLogin}
        modalRegister={modalRegister} setModalRegister={setModalRegister}
        alertLogin={alertLogin} setAlertLogin={setAlertLogin}
        alertMessage={alertMessage} 
        handleNavigation={handleNav}/> : 
      <LoginDesktop 
          handleLogin={handleLogin} handleLoginGoogle={googleLogin} handleRegister={handleRegister} 
          username={username} setUsername={setUsername} 
          password={password} setPassword={setPassword} 
          name={name} setName={setName} 
          email={email} setEmail={setEmail} 
          rememberme={rememberme} setRememberme={setRememberme} 
          modalRegister={modalRegister} setModalRegister={setModalRegister}
          alertLogin={alertLogin} setAlertLogin={setAlertLogin}
          alertMessage={alertMessage} 
          handleNavigation={handleNav}/>
}

export default LoginPageClient
