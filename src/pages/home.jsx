import { useAuthUser } from 'hooks/useAuthUser';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  const { isLogged, isUser } = useAuthUser();
  return (
    <div>
      <div>Welcome to your personal contacts database !</div>
      <div>
        {isLogged ? (
          <div>
            <p>You are logged in as:</p>
            <p>Username: {isUser.name}</p>
            <p>Email: {isUser.email}</p>
          </div>
        ) : (
          <p>
            Please <NavLink to="/register">Register</NavLink> or{' '}
            <NavLink to="/login">Login</NavLink>.
          </p>
        )}
      </div>
    </div>
  );
};
