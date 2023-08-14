const express = require('express');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const template = require('./routes/dishes.router');

// Express middleware
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


// /api/dishes
/* Routes */
app.use('/api/user', userRouter);
app.use('/api/dishes', template);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 8003;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
