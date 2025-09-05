import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const handleLogin = async (
    username: string,
    password: string,
    setAlertLogin: Dispatch<SetStateAction<boolean>>,
    setAlertMessage: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
) => {
    try{
      setLoading(true)
      const res = await axios.post("/api/login", {
        username,
        password
      }, {withCredentials: true})
      setAlertLogin(true)
      setLoading(false)
      setAlertMessage(res.data.message);
    } catch(error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setAlertLogin(true)
        setLoading(false)
        setAlertMessage(error.response.data.message)
      } else {
        setAlertLogin(true)
        setLoading(false)
        setAlertMessage("Server error, coba lagi nanti")
      }
    }
} 

export const handleGoogleLogin = (
  setAlertLogin: Dispatch<SetStateAction<boolean>>,
  setAlertMessage: Dispatch<SetStateAction<string>>,
  setAlertErrorLogin: Dispatch<SetStateAction<boolean>>,
  setAlertErrorMessage: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  username: string
) => useGoogleLogin({
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
          setLoading(true)
          if(cek.status === 200) {
            try {
              const res = await axios.post("/api/login",{username,
                password:process.env.NEXT_PUBLIC_GOOGLE_RANDOM_PASSWORD || "123221"}, {withCredentials: true}
              )
              setAlertLogin(true)
              setLoading(false)
              setAlertMessage(res.data.message);
            } catch (error: unknown) {
              if (axios.isAxiosError(error) && error.response) {
                setAlertLogin(true)
                setLoading(false)
                setAlertMessage(error.response.data.message)
              } else {
                setAlertLogin(true)
                setLoading(false)
                setAlertMessage("Server error, coba lagi nanti")
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