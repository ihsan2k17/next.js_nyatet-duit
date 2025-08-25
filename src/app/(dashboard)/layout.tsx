import React from 'react'
import LayoutClient from './layoutclient';

const layout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <LayoutClient>
      {children}
    </LayoutClient>
  )
}

export default layout
