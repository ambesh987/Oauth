
const express = require('express');
const app = express();
const userController = require('../Controllers/user');
const middleware = require('../Middleware/middleware');
const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
        cb(null, `${__dirname}/public`)
    },
    filename: function (req, file, cb) {
        console.log(file);
        const ext = file.mimetype.split("/")[1];
        //jpeg
        if (ext != 'jpeg') { cb(new Error("format not accept")) }
        cb(null, `/public-${file.fieldname}-${Date.now()}.${ext}`);
    }
})

const upload = multer({
    storage: diskStorage
});
app.get('/', middleware.isValidToken, userController.getAllUser)
app.get('/:userId', middleware.isValidToken, userController.getUserById);
app.put('/:userId', middleware.isValidToken, userController.updateUser);
app.delete('/:userId', middleware.isValidToken, userController.deleteUser);
app.get('/parentInfo/:empId', middleware.isValidToken, middleware.isAdmin, userController.getParentsInfo);
app.post('/sendEmail', middleware.isSuperAdmin, userController.sendEmail);
app.post('/saveImage', upload.single('file'), userController.saveImage)
app.post('/createInsurance', userController.createInsurance)
app.get('/getAllInsurance', userController.getAllInsurance)
app.get('/dashboard', userController.dashboard);


module.exports = app;