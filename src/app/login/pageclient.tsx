'use client';

import { useState } from 'react';
import useIsMobile from '@/hooks/ismobile';
import { useRouter } from 'next/navigation';
import LoginMobile from './loginmobile';
import LoginDesktop from './logindesktop';
import { handleGoogleLogin, handleLogin } from '@/hooks/services/loginhandlers';
import { handleGoogleRegis, handleRegister } from '@/hooks/services/regishandlers';

const LoginPageClient = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remeberMe, setRememberMe] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)
  const [alertLogin, setAlertLogin] = useState(false)
  const [alertErrorLogin, setAlertErrorLogin] = useState(false)
  const [alertRegis, setAlertRegis] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertErrorMessage, setAlertErrorMessage] = useState('')
  const [loading, setLoading] =useState(false)
  const isMobile = useIsMobile()
  const router = useRouter()

  const googleLogin = handleGoogleLogin(
    setAlertLogin, 
    setAlertMessage, 
    setAlertErrorLogin, 
    setAlertErrorMessage,
    setLoading,
    username
  )

  const googleRegis = handleGoogleRegis(
    setAlertRegis, 
    setAlertMessage, 
    setAlertErrorLogin,
    setAlertErrorMessage
  )

  const handleNav = () => {
    setLoading(true)
    router.push ("/home")
  }

  return isMobile ?
    <LoginMobile 
      handleLogin={() => handleLogin(username, password, setAlertLogin, setAlertMessage,setLoading)} handleGoogleLogin={googleLogin}
      handleRegister={() => handleRegister(
        setAlertRegis, setAlertMessage,setAlertErrorLogin,setAlertErrorMessage,
        username,password,name,email, setLoading)} 
      handleGoogleRegis={googleRegis}
      name={name} setName={setName}
      username={username} setUsername={setUsername}
      email={email} setEmail={setEmail}
      password={password} setPassword={setPassword}
      rememberMe={remeberMe} setRememberMe={setRememberMe}
      modalLogin={modalLogin} setModalLogin={setModalLogin}
      modalRegister={modalRegister} setModalRegister={setModalRegister}
      alertLogin={alertLogin} setAlertLogin={setAlertLogin}
      alertErrorLogin={alertErrorLogin} setAlertErrorLogin={setAlertErrorLogin}
      alertMessage={alertMessage} alertErrorMessage={alertErrorMessage} 
      handleNavigation={handleNav} 
      alertRegis={alertRegis} setAlertRegis={setAlertRegis}/> : 
    <div className={`${loading? "cursor-wait":"cursor-auto"}`}>
      <LoginDesktop 
        handleLogin={() => handleLogin(username, password, setAlertLogin, setAlertMessage, setLoading)} handleLoginGoogle={googleLogin} 
        handleRegister={()=> handleRegister(
          setAlertRegis,setAlertMessage, setAlertErrorLogin,setAlertErrorMessage,
          username,password,name,email, setLoading)} 
        handleRegisGoogle={googleRegis}
        username={username} setUsername={setUsername} 
        password={password} setPassword={setPassword} 
        name={name} setName={setName} 
        email={email} setEmail={setEmail} 
        rememberme={remeberMe} setRememberme={setRememberMe} 
        modalRegister={modalRegister} setModalRegister={setModalRegister}
        alertLogin={alertLogin} setAlertLogin={setAlertLogin}
        alertErrorLogin={alertErrorLogin} setAlertErrorLogin={setAlertErrorLogin}
        alertMessage={alertMessage} alertErrorMessage={alertErrorMessage} 
        handleNavigation={handleNav}
        alertRegis={alertRegis} setAlertRegis={setAlertRegis}/>
    </div>
}

export default LoginPageClient
