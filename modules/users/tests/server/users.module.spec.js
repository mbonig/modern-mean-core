import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import express from 'express';
import config from 'modernMean/config';
import * as users from '../../server/users.module';
import userRoutes from '../../server/routes/users.server.routes';
import authRoutes from '../../server/routes/auth.server.routes';
import userModel from '../../server/models/users.server.model.user';
import userSeed from '../../server/models/users.server.model.user.seed';
import authentication from '../../server/authentication/authentication';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

describe('/modules/users/server/users.module.js', () => {

  describe('export', () => {

    it('should export default', () => {
      return users.default.should.be.an.object;
    });

    it('should export init', () => {
      return users.default.should.be.a.function;
    });

    describe('init()', () => {
      let userRoutesSpy, authRoutesSpy, authenticationSpy, mockModel, app;

      describe('seed', () => {
        let mockSeed;

        beforeEach(() => {
          app = express();
          mockModel = sinon.stub(userModel, 'init').resolves();
          mockSeed = sinon.stub(userSeed, 'init');
          config.seedDB = true;
          return users.init(app);
        });

        afterEach(() => {
          mockModel.restore();
          config.seedDB = false;
        });

        it('should call user seed init', () => {
          return mockSeed.should.have.been.called;
        });

      });

      describe('success', () => {

        beforeEach(() => {
          app = express();
          mockModel = sinon.stub(userModel, 'init').resolves();
          authenticationSpy = sinon.spy(authentication, 'init');
          userRoutesSpy = sinon.spy(userRoutes, 'init');
          authRoutesSpy = sinon.spy(authRoutes, 'init');
        });

        afterEach(() => {
          userRoutesSpy.restore();
          authRoutesSpy.restore();
          authenticationSpy.restore();
          mockModel.restore();
        });

        it('should setup user authentication', () => {

          return users.init(app)
                  .then(() => {
                    return authenticationSpy.should.have.been.called;
                  });
        });

        it('should setup user routes', () => {

          return users.init(app)
                  .then(() => {
                    return userRoutesSpy.should.have.been.called;
                  });
        });

        it('should setup authentication routes', () => {

          return users.init(app)
                  .then(() => {
                    return authRoutesSpy.should.have.been.called;
                  });
        });



        it('should resolve a promise', () => {
          return users.init(app).should.be.fulfilled;
        });

      });

      describe('error', () => {

        let mockRoutes;

        describe('express init', () => {
          beforeEach(() => {
            app = express();
            mockRoutes = sinon.stub(userRoutes, 'init').rejects();
            mockModel = sinon.stub(userModel, 'init').resolves();
          });

          afterEach(() => {
            mockRoutes.restore();
            mockModel.restore();

          });

          it('should reject a promise', () => {
            return users.init(app).should.be.rejected;
          });

        });

        describe('model init', () => {
          beforeEach(() => {
            app = express();
            mockModel = sinon.stub(userModel, 'init').rejects();
          });

          afterEach(() => {
            mockModel.restore();
          });

          it('should reject a promise', () => {
            return users.init(app).should.be.rejected;
          });

        });



      });

    });

  });

});