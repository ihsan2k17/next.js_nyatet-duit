'use client';

import LoginDesktop from './logindesktop';
import LoginMobile from './loginmobile';
import useIsMobile from '@/hooks/ismobile';

const LoginPageClient = () => {
  const isMobile = useIsMobile()

  return isMobile ? <LoginMobile /> : <LoginDesktop />;
}

export default LoginPageClient
