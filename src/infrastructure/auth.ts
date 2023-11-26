import { createAuth0Client } from "@auth0/auth0-spa-js";
import config from './../../config.json';

export const initAuth0 = async () => {
  const auth0 = await createAuth0Client({
    domain: config.auth.domain,
    clientId: config.auth.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
    }
  });

  return auth0;
};