const expect = require('chai').expect;
const chai = require('chai');
const mocha = require('mocha');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const server = require('../server.js').app;
const should = chai.should();
const nock = require('nock');
const user_controller = require('../controller/userController').register;
const rewire = require('rewire');
const app = rewire('../server.js');
const request = require('supertest');


chai.use(chaiHttp);

describe('Users',function(){

    describe('POST api/users/register',function(){
        var token ;    
        before((done)=>{
            request(app)
            .post('/api/users/login')
            .send({
                userName:'niul',
                password:'As123456'
            })
            .end((err,res)=>{
                if(err) throw err;
                token = { access_token : res.body.token }
                done();
            })
        });

    
        it("POST user-register api",function(done){

            request(app).post('/api/users/register')
            .send({
                "userName":"rizwan1234567",
                "password":'As123456',
                "confirmPassword":"As123456"
            })
            .expect(200)
            .end(done);

        })

        it("Get specific user api",function(done){

            request(app).get('/users/5b7e58e4076b64753bf96b82')
            .set('Authorization',token)
            .expect(200)
            .end(done);

        })

    // it("It should return register user content",
    // function(done){
    //     chai.request('http://localhost:5000')
    //     .post('api/users/register')
    //     .send(user)
    //     .end((err,res) =>{
    //         res.should.be.a('object');
    //         console.log(res);
    //         done();
    //     });
    // });

    });
});

