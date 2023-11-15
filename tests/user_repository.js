const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const UserRepository = require('../controllers/repository/user_repository');


chai.use(chaiAsPromised);
const { expect } = chai;

describe("User", () => {
    describe("add_user", () => {
        it("should add a user", async () => {
            let user_data = {
                email: 'user01@aemass.com',
                user_name: 'user01',
                password: 'user01',
                avatar: '',
                self_introduction: 'hello'
            };
            const user = await UserRepository.add_user(user_data);
            expect(user).to.have.property('email', 'user01@aemass.com');
            expect(user).to.have.property('name', 'user01');
            expect(user).to.have.property('status', 1);
        });
    });

    describe("get_users", () => {
        it("should get all users", async () => {
            const user = await UserRepository.get_users();
            expect(user[1]).to.have.property('email', 'user01@aemass.com');
            expect(user[1]).to.have.property('name', 'user01');
            expect(user[1]).to.have.property('status', 1);
        });
    });

    describe("update_user", () => {
        it("should update user password", async () => {
            let new_data = {
                email: 'user01@aemass.com',
                password: 'user01user01'
            };
            const user = await UserRepository.update_user(new_data);
            expect(user).to.have.property('email', 'user01@aemass.com');
            expect(user).to.have.property('name', 'user01');
            expect(user).to.have.property('status', 1);
        });
    });

    describe("delete_user", () => {
        it("should delete a user", async () => {
            let user_data = {
                email: 'user01@aemass.com'
            };
            const user = await UserRepository.delete_user(user_data);
            expect(user).to.have.property('email', 'user01@aemass.com');
            expect(user).to.have.property('name', 'user01');
            expect(user).to.have.property('status', 1);
        });
    });
});



