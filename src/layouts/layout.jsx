import { Navigation } from 'components/navigation/navigation.jsx';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};
