import { PrivateRoute } from 'layoutRoutes/privateRoute.jsx';
import { Layout } from 'layouts/layout.jsx';
import { ContactsPage } from 'pages/contactsPage.jsx';
import { Home } from 'pages/home.jsx';
import { LoginPage } from 'pages/loginPage.jsx';
import { RegisterPage } from 'pages/registerPage.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import { refreshUser } from 'redux/auth/actions';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
