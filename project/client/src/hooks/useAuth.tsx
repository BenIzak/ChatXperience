// src/hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const logoutUser = () => {
    dispatch(logout());
  };

  return { isAuthenticated, logoutUser };
};
