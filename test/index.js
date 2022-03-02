//Require the dev-dependencies
 const chai = require('chai')
 const request = require('supertest')
 const expect = chai.expect
 const app = require('../index')

describe('main App', function(){
    describe('get /', function(){
        it('Should return 200 OK with /api uri', function(done){
            request(app)
                .get('/')
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    expect(res.body.newUrl, 'It seems to be NOT Ok').to.match(/\/api/)
                    done()
                })
                .catch(err => done(err))
        })
    })

    describe('get /api/418', function(){
        it('Should return 418 http code', function(done){
            request(app)
                .get('/api/418')
                .set('Accept','application/json')
                .expect(418)
                .then(res => {
                    expect(res.body.code, 418)
                    done()
                })
                .catch(err => done(err))
        })
    })

    describe('get /api/200', function(){
        it('Should return image uri', function(done){
            request(app)
                .get('/api/200')
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    expect(res.body.image, 'It seems to be NOT Ok').to.match(/pexels/)
                    done()
                })
                .catch(err => done(err))
        })
    })

    describe('get /api/400', function(){
        it('Should NOT return image uri', function(done){
            request(app)
                .get('/api/400')
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .then(res => {
                    expect(res.body, 'It seems to be NOT Ok').to.not.match(/image/)
                    done()
                })
                .catch(err => done(err))
        })
    })

    describe('get /api/Invalid', function(){
        it('Should Return 500', function(done){
            request(app)
                .get('/api/Invalid')
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .then(res => {
                    expect(res.body.code, 500)
                    done()
                })
                .catch(err => done(err))
        })
    })

})