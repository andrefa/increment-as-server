## Notes

### Date
12/March/2020

### Location of deployed application
Heroku - https://increment-as-server.herokuapp.com/

### Time spent
6 hours

### Assumptions made
Assumed the counter was generated per user.

### Shortcuts/Compromises made
There are some repeated code, some functions that could be moved to utility files, some syntax sugars could be applied, removed some lint checks that I would like to solve. Not validating if the email is valid.

### Stretch goals attempted
- Deploying it to Heroku OK
- Build UI OK
- OAuth sign up

### Instructions to run assignment locally
```
git clone https://github.com/andrefa/increment-as-server.git
npm i
mv .env.template .env #fill with respective configurations
npm start
```

### What did you not include in your solution that you want us to know about?
Tried to include Google OAuth, haven't found one straghtforward way to (Google developers console has more info/functionalities than I could imagine)

### Other information about your submission that you feel it's important that we know if applicable.
I've built it to be persistent. To accomplish it, I'm using a Postgres database, currently hosted on Heroku. Also I've tried to build one consistent architecture. Added my own dependency injector, manually, to make it easier to test (tests not included).

### Your feedback on this technical challenge
A good chalenge. I think it would be easier without the authentication part but probably it would be too simple for this assignment.
