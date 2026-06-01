import { useLayoutEffect } from 'react';
import { useLocation } from 'wouter';
import { normalizePath } from '@/lib/normalizePath';

export function RouteEffects() {
  const [location, setLocation] = useLocation();

  useLayoutEffect(() => {
    const normalized = normalizePath(location);
    if (normalized !== location) {
      setLocation(normalized);
    }
  }, [location, setLocation]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location]);

  return null;
}

export function RedirectTo({ to }: { to: string }) {
  const [, setLocation] = useLocation();

  useLayoutEffect(() => {
    setLocation(to);
  }, [to, setLocation]);

  return null;
}
