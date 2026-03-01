import { useLocation, useNavigate } from 'react-router';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/home', icon: '🏠', label: 'Beranda' },
  { path: '/muhasabah', icon: '📋', label: 'Muhasabah' },
  { path: '/analytics', icon: '📊', label: 'Analitik' },
  { path: '/inspiration', icon: '💡', label: 'Inspirasi' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50"
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(13,94,63,0.1)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200"
              style={{ outline: 'none', border: 'none', background: 'none' }}
            >
              <div
                className="flex items-center justify-center w-9 h-7 rounded-full transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(13,94,63,0.12)' : 'transparent',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <span className="text-xl leading-none">{item.icon}</span>
              </div>
              <span
                className="text-[10px] leading-none transition-all duration-200"
                style={{
                  color: isActive ? '#0d5e3f' : '#9ca3af',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: isActive ? '600' : '400',
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
