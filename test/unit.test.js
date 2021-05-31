/* eslint-disable handle-callback-err */
let chai = require('chai')
let chaiHttp = require('chai-http')
chai.should()

chai.use(chaiHttp)
let server = require('../app')

describe('Museum Visitors', () => {
  describe('/GET museum visitors', () => {
    it('it should GET all the visitors', (done) => {
      chai.request(server)
        .get('/api/visitors')
        .end((err, res) => {
          (res).should.have.status(200);
          (res.body).should.be.a('object')
          done()
        })
    })
  })
})
