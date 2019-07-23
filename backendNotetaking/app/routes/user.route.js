module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve all users
   app.get('/users',users.findAll)
   app.post('/login',users.login);

   app.post('/users/delete', users.delete);
}