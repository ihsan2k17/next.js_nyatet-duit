import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { Dispatch, SetStateAction } from "react"

export const handleRegister = async (
    setAlerRegis: Dispatch<SetStateAction<boolean>>,
    setAlertMessage: Dispatch<SetStateAction<string>>,
    setAlertErrorLogin: Dispatch<SetStateAction<boolean>>,
    setAlertErrorMessage:Dispatch<SetStateAction<string>>,
    username:string,
    password:string,
    name:string,
    email:string,
    setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const res =  await axios.post("/api/register",{
      username: username,
      password: password,
      name: name,
      email: email
    })
    setLoading(true)
    if(res.status === 201) {
      setAlerRegis(true)
      setLoading(false)
      setAlertMessage(res.data.message);
    }
  } catch (error) {
    if(axios.isAxiosError(error) && error.response) {
      setAlertErrorLogin(true)
      setLoading(false)
      setAlertErrorMessage(error.response.data.message)
    } else {
      setAlertErrorLogin(true)
      setLoading(false)
      setAlertErrorMessage("Server Error, coba lagi nanti brokk!!")
    }
  }
}

export const handleGoogleRegis = (
    setAlerRegis: Dispatch<SetStateAction<boolean>>,
    setAlertMessage: Dispatch<SetStateAction<string>>,
    setAlertErrorLogin: Dispatch<SetStateAction<boolean>>,
    setAlertErrorMessage: Dispatch<SetStateAction<string>>
) => useGoogleLogin ({
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
        setAlertErrorLogin(true)
        setAlertErrorMessage("Sign Up Failed")
    }
})