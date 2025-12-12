import React from 'react'
import LayoutClient from './layoutclient';

export const metadata  = {
  icons: {
    icon:"/paperplane_add.svg"
  }
}
const layout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <LayoutClient>
      {children}
    </LayoutClient>
  )
}

export default layout
