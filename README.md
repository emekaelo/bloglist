# Testing React apps

Working branch for part5 exercises of the FullStackOpen course for cohort 2020 by etki_JS

This branch has backend and frontend which is needed for unit test with jest and react testing library and end 2 end testing with cypress.

### Important things to note

The backend had issues running the proper way for the e2e testing with Cypress.  
Instruction was given to use the npm script <code>"start:test": "cross-env NODE_ENV=test node index.js"</code> to start the database in test mode but when I tried it, it did not work as intended. After further debugging, I figured it was from the `NODE_ENV` being specified as 'test' as the script worked when the `NODE_ENV` was specified as either production or development. This led to a few modifications to make the entire testing process run smoothly;

> I have undone the changes so these steps should be followed to run this branch successfully

- <code>"start:test": "cross-env NODE_ENV=development node index.js"</code> was used as the npm script in `package.json`
- Due to change above, <code>process.env.NODE_ENV === "development"</code> was added as another check in `app.js` to make the database switch to test database.
- If a jest warning is gotten while running the frontend, jest folder may likely need to be removed form the backend `node_modules` folder
