import { Outlet } from 'react-router';
import { Header } from '../shared/components/Header/Header';

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
