import { useAuthUser } from 'hooks/useAuthUser';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOut } from 'redux/auth/actions';

export const Navigation = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const { isLogged } = useAuthUser();

  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        {isLogged ? (
          <button onClick={handleLogOut}>Log out</button>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
