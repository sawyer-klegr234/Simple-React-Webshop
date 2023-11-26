import { useEffect } from "preact/hooks";
import { initAuth0 } from "../infrastructure/auth";

const Login = () => {
  useEffect(() => {
    const login = async () => {
      const auth0 = await initAuth0();
      await auth0.loginWithRedirect();
    };
    login();
  }, []);

  return <></>;
};

export default Login;
