const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');

const app = require('../app');


chai.use(chaiHttp);
chai.should();

describe("User", () => {
    describe("POST /", () => {
        it("should add a user", (done) => {
            let user = {
                email: 'user01@aemass.com',
                name: 'user01',
                password: 'user01',
                avatar: '',
                self_introduction: 'hello'
            };
            chai.request(app)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.email.should.equal('user01@aemass.com');
                res.body.name.should.equal('user01');
                res.body.self_introduction.should.equal('hello');
                done();
            });
        });
    });

    describe("GET /", () => {
        it("should get all users", (done) => {
            chai.request(app)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body[1].email.should.equal('user01@aemass.com');
                res.body[1].name.should.equal('user01');
                res.body[1].status.should.equal(1);
                done();
            });
        });

        it("should get user by email", (done) => {
            chai.request(app)
            .get('/users/user01@aemass.com')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.email.should.equal('user01@aemass.com');
                res.body.name.should.equal('user01');
                res.body.status.should.equal(1);
                done();
            });
        });
    });

    describe("PATCH /", () => {
        it("should update user password", (done) => {
            let new_data = {
                email: 'user01@aemass.com',
                password: 'user01user01'
            };
            chai.request(app)
            .patch('/users')
            .send(new_data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.email.should.equal('user01@aemass.com');
                res.body.name.should.equal('user01');
                res.body.self_introduction.should.equal('hello');
                res.body.status.should.equal(1);
                done();
            });
        });
    });

    describe("DELETE /", () => {
        it("should delete a user", (done) => {
            chai.request(app)
            .delete('/users')
            .send({email: 'user01@aemass.com'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.email.should.equal('user01@aemass.com');
                res.body.name.should.equal('user01');
                res.body.self_introduction.should.equal('hello');
                res.body.status.should.equal(1);
                done();
            })
        });
    });
});
