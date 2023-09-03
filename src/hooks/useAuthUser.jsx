import { useSelector } from 'react-redux';
import {
  selectIsRefreshing,
  selectLoggedIn,
  selectUser,
} from 'redux/auth/selectors';

export const useAuthUser = () => {
  const isLogged = useSelector(selectLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isUser = useSelector(selectUser);

  return { isLogged, isRefreshing, isUser };
};
