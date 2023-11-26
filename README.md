
# Simple React Webshop

### Notes
-	I used Preact/Vite to get up and running quickly as it is very light and quick to setup, and does not have any limitations that negatively will impact the project.
-	I used npm-watch to for hot-reload during development.

### Running the web app
1. Clone the git repo
2. Navigate to the root folder and run `npm install`
3. Run `npm run watch dev` to build and run the web app, then navigate to the localhost:5173. I have only setup a dev script for the time being as it is adequate to launch and test the web app. To be able to login, the app must be running on port 5173 as that is the only currently specified allowed callback URL in auth0.
