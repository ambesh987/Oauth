
const express = require('express');
const app = express();
const authController = require('../Controllers/auth.controller');
const passport = require('../Authentication/googleLogin');


app.post('/signUp', authController.signUp);
app.post('/signIn', authController.signIn);
app.put('/signOut', authController.signOut);
app.get('/failed', (req, res) => {
    res.send("Some error occured while login to google");
});

app.get('/failed', authController.failedGoogleLogin)

app.get('/google', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}
));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }), authController.googleLogin
);

module.exports = app;
