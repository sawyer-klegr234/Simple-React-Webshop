import { createAuth0Client } from "@auth0/auth0-spa-js";

export const initAuth0 = async () => {
  const auth0 = await createAuth0Client({
    domain: 'dev-g1kt7aaq50wq7eqn.us.auth0.com',
    clientId: 'JACdiyKMkI0Yxyb5DctyLKWdOIG8zhmV',
    authorizationParams: {
        redirect_uri: window.location.origin
    }
  });

  return auth0;
};