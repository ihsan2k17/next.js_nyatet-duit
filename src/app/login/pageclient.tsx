'use client';

import { SetStateAction, useState } from 'react';
import useIsMobile from '@/hooks/ismobile';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoginMobile from './loginmobile';
import LoginDesktop from './logindesktop';
import { useGoogleLogin } from '@react-oauth/google';



const LoginPageClient = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberme, setRememberme] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)
  const [alertLogin, setAlertLogin] = useState(false)
  const [alertErrorLogin, setAlertErrorLogin] = useState(false)
  const [alertRegis, setAlerRegis] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertErrorMessage, setAlertErrorMessage] = useState('')
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
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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
        if(userInfo) {
          const cek = await axios.post("/api/auth/google",{
            username: userInfo.email,
            name: userInfo.name,
            email: userInfo.email
          })
          if(cek.status === 200) {
            try {
              const res = await axios.post("/api/login",{username,
              password:process.env.NEXT_PUBLIC_GOOGLE_RANDOM_PASSWORD || "123221"}, {withCredentials: true}
            )
            setAlertLogin(true)
            setAlertMessage(res.data.message);
            } catch (error: unknown) {
              if (axios.isAxiosError(error) && error.response) {
                setAlertMessage(error.response.data.message);
                setAlertLogin(true);
              } else {
                setAlertMessage("Server error, coba lagi nanti");
                setAlertLogin(true);
              }
            }
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setAlertErrorMessage(`Gagal ambil user info: ${errorMessage}`);
        setAlertErrorLogin(true);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const googleRegis = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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
        if(userInfo) {
          const res =  await axios.post("/api/register",{
            username: userInfo.email,
            password: process.env.NEXT_PUBLIC_GOOGLE_RANDOM_PASSWORD || "123321",
            name: userInfo.name,
            email: userInfo.email
          })
          if(res.status === 201) {
            setAlerRegis(true)
            setAlertMessage(res.data.message);
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setAlertErrorMessage(`Gagal ambil user info: ${errorMessage}`);
        setAlertErrorLogin(true);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  })

  const handleRegister = () => {
    console.log("Register Cuy")
  }


  const handleNav = () => {
    router.push ("/home")
  }

  return isMobile ?
    <LoginMobile 
      handleLogin={handleLogin} handleGoogleLogin={googleLogin}
      handleRegister={handleRegister} handleGoogleRegis={googleRegis}
      name={name} setName={setName}
      username={username} setUsername={setUsername}
      email={email} setEmail={setEmail}
      password={password} setPassword={setPassword}
      rememberMe={rememberme} setRememberMe={setRememberme}
      modalLogin={modalLogin} setModalLogin={setModalLogin}
      modalRegister={modalRegister} setModalRegister={setModalRegister}
      alertLogin={alertLogin} setAlertLogin={setAlertLogin}
      alertErrorLogin={alertErrorLogin} setAlertErrorLogin={setAlertErrorLogin}
      alertMessage={alertMessage} alertErrorMessage={alertErrorMessage} 
      handleNavigation={handleNav} 
      alertRegis={alertRegis} setAlertRegis={setAlerRegis}/> : 
      <LoginDesktop 
          handleLogin={handleLogin} handleLoginGoogle={googleLogin} 
          handleRegister={handleRegister} handleRegisGoogle={googleRegis}
          username={username} setUsername={setUsername} 
          password={password} setPassword={setPassword} 
          name={name} setName={setName} 
          email={email} setEmail={setEmail} 
          rememberme={rememberme} setRememberme={setRememberme} 
          modalRegister={modalRegister} setModalRegister={setModalRegister}
          alertLogin={alertLogin} setAlertLogin={setAlertLogin}
          alertErrorLogin={alertErrorLogin} setAlertErrorLogin={setAlertErrorLogin}
          alertMessage={alertMessage} alertErrorMessage={alertErrorMessage} 
          handleNavigation={handleNav}
          alertRegis={alertRegis} setAlertRegis={setAlerRegis}/>
}

export default LoginPageClient
