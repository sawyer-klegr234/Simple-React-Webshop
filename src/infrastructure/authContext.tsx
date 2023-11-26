import { ComponentChildren, createContext } from "preact";
import { StateUpdater, useContext, useEffect, useState } from "preact/hooks";
import { initAuth0 } from "./auth";
import config from './../../config.json';

interface Props {
  children: ComponentChildren;
}

export type UserRole = 'admin' | 'customer';

interface AuthContextType {
  roles: UserRole[];
  setRoles: StateUpdater<UserRole[]>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType>({
  roles: [],
  setRoles: () => { },
  isAuthenticated: false,
  isAdmin: false,
  isCustomer: false,
});

export const AuthContextProvider = (props: Props) => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth0 = await initAuth0();
      const query = window.location.search;
      const shouldParseResult = query.includes("code=") && query.includes("state=");
      
      if (shouldParseResult) {
        try {
          await auth0.handleRedirectCallback();
        } catch (e) {
          console.warn("Error parsing redirect:", e);
        }

        window.history.replaceState({}, document.title, "/");
      }

      const isAuthed = await auth0.isAuthenticated()
      setAuthenticated(isAuthed);

      if (!isAuthed) {
        // Redirect to login if the user is not logged in. Would be nicer to do this with useNavigate,
        // but it does not really matter as we will be redirected to Auth0, meaning a full page reload
        // is not that big of a deal. We can not use useNavigate as we are outside of a router.
        window.location.href = "login";
      } else {
        const claims = await auth0.getIdTokenClaims();
        setRoles(claims[`${config.auth.namespace}/roles`] as UserRole[]);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      roles: roles,
      setRoles: setRoles,
      isAuthenticated: authenticated,
      isAdmin: roles.some(x => x === "admin"),
      isCustomer: roles.some(x => x === "customer")
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);