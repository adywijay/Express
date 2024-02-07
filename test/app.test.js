const app = require('../server'); // Ganti '../app' dengan jalur ke file aplikasi Express.js Anda

import('chai').then(chai => {
    const chaiHttp = chai.default.use(require('chai-http'));

    // Assertion style
    const expect = chai.default.expect;

    describe('Testing Express App', () => {
        it('Should return status 200 when accessing home page', (done) => {
            chaiHttp.request(app)
                .get('/')
                .end((err, res) => {
                    // Check status code
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
}).catch(error => console.error(error));