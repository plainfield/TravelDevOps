var should = require('should');
var app = require('../app').app;
var supertest = require('supertest');
var agent = supertest.agent(app);

describe ("test API services:", function() {
    this.timeout(30000);
    it ("should not get home page", function (done) {
        agent.get('/index.html')
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
            done();
        });
    });
});