
# Simple React Webshop

### Assumptions
The doc says under the "Admin" section "List carts of customers" and "View the details of a cart". I am assuming that rather than "carts", these should be submitted orders, as viewing active carts that have not been placed as a order does not make much sense, and it never says anything about viewing placed orders wich is implemented as part of the "Customer" section.

### Notes
-	I used Preact/Vite to get up and running quickly as it is very light and quick to setup, and does not have any limitations that negatively will impact the project.
-	I used npm-watch to for hot-reload during development.

### Running the web app
1. Clone the git repo
2. Navigate to the root folder and run `npm install`
3. Run `npm run watch dev` to build and run the web app, then navigate to 127.0.0.1:5173.

#### Notes about config
I have only setup a dev script for the time being as it is adequate to launch and test the web app. To be able to login, the app must be running on 127.0.0.1:5173 as that is the address I used to configure auth0 (there is a custom flow to add the user roles to the id token, as rules are being phased out) as well as vite. Obviously if this was to be used in production you would not set it up like this, but for a web app running locally this works totally fine.

### Testing
Run `npx jest` from the root folder to run jest tests

### Troubleshooting
Normally this section would have a little more general instruction, but seeing as it is such a small program, basically the only thing that is likely to have issues is authentication, so I will add quite detailed stuff about auth here ;) You should just be able to use a existing user and not have to mess around with any auth0 stuff if it is running on 127.0.0.1:5173 though. 

**Auth not working:**
If auth0 is not working as intended due to changing the config for host/port used by the app, the existing tenant config probably needs to be updated, or a new application needs to be created in the auth0 dashboard to be used instead.

**Creating a new application in auth0: (details of how auth0 is set up)**
1. Login to your auth0 dashboard (or create a account) - https://manage.auth0.com/dashboard
2. Create a new application. Specify the allowed callback url, allowed logout url and allowed web origins you want to use. Update the domain and clientId in auth.ts.
3. Create two roles under user management - "admin" and "customer". Assign this as desired when creating users.
4. Update auth config in config.json.
5. Create a login flow under actions to add the user roles to the token. (this was previously achieved using rules which have recently been deprecated)
6. Add the following to the new login flow with your desired namespace:

/**
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behaviour of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
const namespace = 'http://127.0.0.1:5173';
if (event.authorization) {
    api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
    api.accessToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
}
}