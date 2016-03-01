'use strict';

import passport from 'passport';
import express from 'express';
import { profile, password } from '../controllers/users.server.controller';
import chalk from 'chalk';


function init(app) {
  return new Promise(function (resolve, reject) {
    try {
      let router = express.Router();

      //Set JWT Auth for all user Routes
      router.all('*', passport.authenticate('jwt', { session: false }));

      // Setting up the users profile api
      router.route('/me').get(profile.me);
      router.route('/').put(profile.update);
      //TODO  renable when social accounts are working again.
      //router.route('/accounts').delete(controllers.authentication.removeOAuthProvider);
      router.route('/password').post(password.changePassword);
      router.route('/picture').post(profile.changeProfilePicture);

      app.use('/api/users', router);
      resolve(app);
    } catch(err) {
      reject(err);
    }

  });
}



export default init;
