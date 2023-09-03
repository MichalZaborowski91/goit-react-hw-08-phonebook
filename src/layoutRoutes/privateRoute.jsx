import { useAuthUser } from 'hooks/useAuthUser';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component, redirectTo = '/' }) => {
  const { isLogged } = useAuthUser();

  return isLogged ? component : <Navigate to={redirectTo} />;
};
