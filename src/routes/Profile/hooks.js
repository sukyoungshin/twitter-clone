import { useHistory } from 'react-router';
import { authService } from 'firebaseConfig';
import { ROUTER } from 'constants/router';

export const useLogout = () => {
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push(ROUTER.ROOT);
  };
  return { onLogout };
};

