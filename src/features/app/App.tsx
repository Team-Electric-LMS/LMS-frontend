import { Outlet } from 'react-router';
import { HeaderNav } from '../shared/components/HeaderNav';

export function App() {
  return (
    <>
  <HeaderNav />
      <Outlet />
    </>
  );
}
