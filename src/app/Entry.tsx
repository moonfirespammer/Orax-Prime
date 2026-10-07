import { Navigate } from 'react-router';
import { useMe } from '@/store/me';

/** The app's entry: Today for a player who has done the identity test on this device, the invite code otherwise. */
export function Entry() {
  const ready = useMe((s) => s.ready);
  const onboarded = useMe((s) => s.onboarded);
  if (!ready) return null;
  return <Navigate to={onboarded ? '/today' : '/invite'} replace />;
}
