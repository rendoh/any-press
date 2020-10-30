import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../api/auth';
import { Paths } from '../../components/Routes';
import { LoginFormValues } from '../../types/auth';
import { toastErrorResponse } from '../../utils/toast';
import { useSetAuthenticatedUser } from '../recoil/auth';

export function useLogoutUseCase() {
  const setAuthenticatedUser = useSetAuthenticatedUser();

  return () => {
    logout();
    setAuthenticatedUser(null);
  };
}

export function useLoginUseCase() {
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const navigate = useNavigate();

  return (value: LoginFormValues) =>
    login(value)
      .then(({ data }) => {
        setAuthenticatedUser(data);
        navigate(Paths.home);
      })
      .catch(toastErrorResponse);
}
