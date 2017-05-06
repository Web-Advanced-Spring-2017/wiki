## Concepts
OAuth
PassportJs

- Step 1 : Form Setup
- Step 2 : Registeration
- Step 3 : Login Authentication
- Step 4 : Logout


## Readings
[OAuth Good-Bad-Ugly](https://code.tutsplus.com/articles/oauth-20-the-good-the-bad-the-ugly--net-33216)
[Social Auth](https://code.tutsplus.com/articles/social-authentication-for-nodejs-apps-with-passport--cms-21618)
[Refactoring a basic auth API](http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/)
Credits: https://github.com/bradtraversy/loginapp

[PassportJS](http://passportjs.org/docs)
[NPM: Bcrypt Package](https://www.npmjs.com/package/bcryptjs#usage---async)

```
npm install mongoose passport passport-local passport-http connect-flash bcryptjs express-session express-messages express-validator --save
mongod # Start the server
mongo # New shell
use auth # Create new db
```

*Notes:*
- Connect-flash allows for passing session flashdata messages.
- Bcrypt-nodejs gives us the ability to hash the password.
- express-validator does form validation