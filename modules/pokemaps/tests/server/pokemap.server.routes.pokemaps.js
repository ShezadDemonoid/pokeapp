'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Pokemap = mongoose.model('Pokemap'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, pokemap;

/**
 * Pokemap routes tests
 */
describe('Pokemap CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new pokemap
    user.save(function () {
      pokemap = {
        title: 'Pokemap Title',
        content: 'Pokemap Content'
      };

      done();
    });
  });

  it('should be able to save an pokemap if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new pokemap
        agent.post('/api/pokemaps')
          .send(pokemap)
          .expect(200)
          .end(function (pokemapSaveErr, pokemapSaveRes) {
            // Handle pokemap save error
            if (pokemapSaveErr) {
              return done(pokemapSaveErr);
            }

            // Get a list of pokemaps
            agent.get('/api/pokemaps')
              .end(function (pokemapsGetErr, pokemapsGetRes) {
                // Handle pokemap save error
                if (pokemapsGetErr) {
                  return done(pokemapsGetErr);
                }

                // Get pokemaps list
                var pokemaps = pokemapsGetRes.body;

                // Set assertions
                (pokemaps[0].user._id).should.equal(userId);
                (pokemaps[0].title).should.match('Pokemap Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an pokemap if not logged in', function (done) {
    agent.post('/api/pokemaps')
      .send(pokemap)
      .expect(403)
      .end(function (pokemapSaveErr, pokemapSaveRes) {
        // Call the assertion callback
        done(pokemapSaveErr);
      });
  });

  it('should not be able to save an pokemap if no title is provided', function (done) {
    // Invalidate title field
    pokemap.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new pokemap
        agent.post('/api/pokemaps')
          .send(pokemap)
          .expect(400)
          .end(function (pokemapSaveErr, pokemapSaveRes) {
            // Set message assertion
            (pokemapSaveRes.body.message).should.match('Title cannot be blank');

            // Handle pokemap save error
            done(pokemapSaveErr);
          });
      });
  });

  it('should be able to update an pokemap if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new pokemap
        agent.post('/api/pokemaps')
          .send(pokemap)
          .expect(200)
          .end(function (pokemapSaveErr, pokemapSaveRes) {
            // Handle pokemap save error
            if (pokemapSaveErr) {
              return done(pokemapSaveErr);
            }

            // Update pokemap title
            pokemap.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing pokemap
            agent.put('/api/pokemaps/' + pokemapSaveRes.body._id)
              .send(pokemap)
              .expect(200)
              .end(function (pokemapUpdateErr, pokemapUpdateRes) {
                // Handle pokemap update error
                if (pokemapUpdateErr) {
                  return done(pokemapUpdateErr);
                }

                // Set assertions
                (pokemapUpdateRes.body._id).should.equal(pokemapSaveRes.body._id);
                (pokemapUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of pokemaps if not signed in', function (done) {
    // Create new pokemap model instance
    var pokemapObj = new Pokemap(pokemap);

    // Save the pokemap
    pokemapObj.save(function () {
      // Request pokemaps
      request(app).get('/api/pokemaps')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single pokemap if not signed in', function (done) {
    // Create new pokemap model instance
    var pokemapObj = new Pokemap(pokemap);

    // Save the pokemap
    pokemapObj.save(function () {
      request(app).get('/api/pokemaps/' + pokemapObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', pokemap.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single pokemap with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/pokemaps/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Pokemap is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single pokemap which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent pokemap
    request(app).get('/api/pokemaps/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No pokemap with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an pokemap if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new pokemap
        agent.post('/api/pokemaps')
          .send(pokemap)
          .expect(200)
          .end(function (pokemapSaveErr, pokemapSaveRes) {
            // Handle pokemap save error
            if (pokemapSaveErr) {
              return done(pokemapSaveErr);
            }

            // Delete an existing pokemap
            agent.delete('/api/pokemaps/' + pokemapSaveRes.body._id)
              .send(pokemap)
              .expect(200)
              .end(function (pokemapDeleteErr, pokemapDeleteRes) {
                // Handle pokemap error error
                if (pokemapDeleteErr) {
                  return done(pokemapDeleteErr);
                }

                // Set assertions
                (pokemapDeleteRes.body._id).should.equal(pokemapSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an pokemap if not signed in', function (done) {
    // Set pokemap user
    pokemap.user = user;

    // Create new pokemap model instance
    var pokemapObj = new Pokemap(pokemap);

    // Save the pokemap
    pokemapObj.save(function () {
      // Try deleting pokemap
      request(app).delete('/api/pokemaps/' + pokemapObj._id)
        .expect(403)
        .end(function (pokemapDeleteErr, pokemapDeleteRes) {
          // Set message assertion
          (pokemapDeleteRes.body.message).should.match('User is not authorized');

          // Handle pokemap error error
          done(pokemapDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Pokemap.remove().exec(done);
    });
  });
});
