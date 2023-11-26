import { useEffect } from 'preact/hooks';
import { initAuth0 } from '../infrastructure/auth';

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      const auth0 = await initAuth0();
      auth0.logout();
    };
    logout();
  }, []);

  return (
    <div class="c-logout">
      <p class="c-logout__message">Logging out...</p>
    </div>
  );
};

export default Logout;