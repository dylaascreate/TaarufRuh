import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import { BottomNav } from './BottomNav';

export function Root() {
  const { user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user.onboardingComplete && location.pathname !== '/onboarding') {
      navigate('/onboarding', { replace: true });
    } else if (user.onboardingComplete && location.pathname === '/onboarding') {
      navigate('/home', { replace: true });
    } else if (user.onboardingComplete && location.pathname === '/') {
      navigate('/home', { replace: true });
    }
  }, [user.onboardingComplete, location.pathname, navigate]);

  const showNav = user.onboardingComplete && location.pathname !== '/onboarding';

  return (
    <div
      className="flex justify-center items-start min-h-screen"
      style={{ background: '#e8e3d8', fontFamily: 'Poppins, sans-serif' }}
    >
      <div
        className="relative w-full max-w-[390px] min-h-screen flex flex-col"
        style={{ background: '#f5f0e8' }}
      >
        <main className={`flex-1 overflow-y-auto ${showNav ? 'pb-20' : ''}`}>
          <Outlet />
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
