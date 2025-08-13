'use client';
import { useEffect, useState } from 'react';
import LoginDesktop from './logindesktop';
import LoginMobile from './loginmobile';
import useIsMobile from '@/hooks/ismobile';

export default function LoginPage() {
  const isMobile = useIsMobile()

  return isMobile ? <LoginMobile /> : <LoginDesktop />;
}
