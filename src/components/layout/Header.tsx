'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PortalSwitcher from '@/components/portal/PortalSwitcher';
import PortalBadge from '@/components/portal/PortalBadge';
import { usePortal } from '@/lib/portal-context';

const ALL_NAV_ITEMS = [
  { href: '/', label: 'Home', roles: null },
  { href: '/assessment', label: 'Assessment', roles: null },
  { href: '/missions', label: 'Missions', roles: null },
  { href: '/admin', label: 'Admin', roles: ['admin', 'school_admin'] },
  { href: '/national', label: 'Strategic', roles: ['admin'] },
];

export default function Header() {
  const pathname = usePathname();
  const { mode, role } = usePortal();

  const navItems = ALL_NAV_ITEMS.filter((item) => {
    if (mode === 'demo') return true;
    if (item.roles === null) return true;
    return item.roles.includes(role);
  });

  return (
    <header className="sticky top-0 z-50 border-b border-panel-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider">
          <span className="text-accent">CYBER</span>
          <span className="text-foreground">SHIELD</span>
          <span className="text-muted text-xs ml-1">UAE</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  active
                    ? 'text-accent bg-accent/10'
                    : 'text-muted hover:text-foreground hover:bg-panel-bg'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <PortalBadge />
          <PortalSwitcher />
        </div>
      </div>
    </header>
  );
}
