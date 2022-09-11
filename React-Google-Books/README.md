## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### How it works
1.when we search isbn, it checks whether isbn is of valid format ( 13 digit long, starts with 9, numeric). If it is valid, it will look for the book with that isbn in the database.If found, it will display it from the database. Otherwise it will hit the google api.
2.User id of the user is explicitly mentioned in the api call.
