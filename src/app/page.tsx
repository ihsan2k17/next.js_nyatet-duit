import GetStartedClient from "./pageclient";

export const metadata = {
    title: {
    default: "Nyatetin Duit",
    template: "%s | Nyatetin Duit",
  },
  description: "Aplikasi pencatat keuangan",
}

const getStarted = () => {
    
    return <GetStartedClient />
}
export default getStarted