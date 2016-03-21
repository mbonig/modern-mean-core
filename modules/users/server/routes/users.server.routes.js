import passport from 'passport';
import express from 'express';
import chalk from 'chalk';
import multer from 'multer';
import { profile, password } from '../controllers/users.server.controller';
import profileUpload from '../config/profileUpload';

function init(app) {
  return new Promise(function (resolve, reject) {
    let router = express.Router();

    let upload = multer({
      storage: profileUpload.storage(),
      fileFilter: profileUpload.filter
    });

    //Set JWT Auth for all user Routes
    router.all('*', passport.authenticate('jwt', { session: false }));

    // Setting up the users profile api
    router.route('/me').get(profile.me);
    router.route('/').put(profile.update);
    //TODO  renable when social accounts are working again.
    //router.route('/accounts').delete(controllers.authentication.removeOAuthProvider);
    router.route('/password').post(password.changePassword);
    router.route('/picture').post(upload.single('newProfilePicture'), profile.changeProfilePicture);

    app.use('/api/users', router);
    console.log(chalk.bold.green('Users::Routes::Success'));
    resolve(app);
  });
}

let service = { init: init };

export default service;
export { init };
