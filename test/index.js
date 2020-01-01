require('chai/register-assert')
require('chai/register-expect')
require('chai/register-should')

const {codes} = require('../index')



describe('module index.js', function () {

    it ('Exports object', function () {
        expect(codes).to.be.an('object')
    })

    it('Each status contains fields "code" and "message"', function () {

        readNestedStatuses(codes)

        function readNestedStatuses (object) {
            Object.values(object).map(probably_status => {

                // ignoring .statusEqual() method
                if (typeof probably_status === 'function') return

                if (typeof probably_status === 'object') {
                    // we are dealing with the nested statuses chapter
                 if (!probably_status.code || !probably_status.message) {
                     readNestedStatuses(probably_status)
                 }  else {
                     expect(probably_status).to.be.an('object')
                     expect(probably_status).to.have.property('code')
                     expect(probably_status.code).to.be.a('number')
                     expect(probably_status).to.have.property('message')
                     expect(probably_status.message).to.be.a('string')
                 }
                }

            })
        }

    })

    it('Statuses are immutable', function () {

        // validation
        expect(codes).to.have.property('OK')
        expect(codes.OK).to.be.an('object')
        expect(codes.OK.code).to.be.a('number')
        expect(codes.OK.message).to.be.a('string')

        // assignment
        codes.OK = {}

        // validation again
        expect(codes).to.have.property('OK')
        expect(codes.OK).to.be.an('object')
        expect(codes.OK.code).to.be.a('number')
        expect(codes.OK.message).to.be.a('string')
    })


    it('Properties .code and .message of each status are immutable', function () {

        // codes.OK is the most used status

        // validation
        expect(codes).to.have.property('OK')
        expect(codes.OK).to.be.an('object')
        expect(codes.OK.code).to.be.a('number')
        expect(codes.OK.message).to.be.a('string')

        // saving prev values
        const prev_code = codes.OK.code
        const prev_message = codes.OK.message


        // assignment of new values
        codes.OK.code = Date.now()
        codes.OK.message = Math.random().toString()

        // new values shouldn't be assigned
        expect(codes.OK.code).to.be.equal(prev_code)
        expect(codes.OK.message).to.be.equal(prev_message)

    })

    it('Exports .statusEqual() method that returns bool value', function () {

        expect(codes.statusEqual).to.be.a('function')

        expect(codes.statusEqual()).to.be.a('boolean')

        expect(codes.statusEqual(codes.OK, {code: Math.random(), message: 'random_message'})).to.equal(false)

        expect(codes.statusEqual(codes.OK, codes.FAIL)).to.equal(false)

        expect(codes.statusEqual(codes.OK, codes.OK)).to.equal(true)

    })

    it ('Method .statusEqual() is immutable', function () {

        expect(codes.statusEqual).to.be.a('function')

        codes.statusEqual = 1

        expect(codes.statusEqual).to.be.a('function')

    })

})


