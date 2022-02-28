//Require the dev-dependencies
 const chai = require('chai')
 const request = require('supertest')
 // const assert = require('assert')
 const expect = chai.expect
 const app = require('../index')

describe('main App', function(){
    describe('get /', function(){
        it('Should return 200 OK with /api url', function(done){
            request(app)
                .get('/')
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    // console.log(res.body)
                    // console.log(res.headers)
                    // console.log(res.status)
                    expect(res.body.newUrl, 'It seems to be NOT Ok').to.match(/\/api/)
                    done()
                })
                .catch(err => done(err))
        })
    })

})