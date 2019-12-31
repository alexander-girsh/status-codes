/**
 * @module status-codes/index
 * @desc
 * It exports the ecosystem-level response codes and statuses to use it as the quick-read human-friendly response of
 * any API or the public method of the neighbour module.
 *
 * The idea is based on the JSON-RPC protocol spec.
 *
 * As a part of HTTP-API response it is better than http 1**-5** statuses (but the of them 418 is still unsurpassed),
 * cause we can describe our business-logic as pizdato as we can using as much this codes as we need.
 *
 * ABSTRACT
 * Client sends an http-api req.
 * Server sends a JSON response with {status: {code: 106, message: 'WRONG_ARGS'}}.
 * Client has the same statuses .js module (this module) as the server.
 * Handling the response client calls codes.statusEqual(res.status, codes.WRONG_ARGS)
 * and gets a bool value into the server's response handler code.
 *
 * Goals:
 * - human-readability
 * - one style of errors handling for all project ecosystem
 * - one style of server response for all HTTP/WS apis
 */


/**
 * A collection of statuses
 */

import statuses from './statuses.js'

/**
 * It calls native Object.freeze() for the object
 * and for all embed objects recursively
 * @param obj {Object}
 * @void
 */
function freezeObjectDeep (obj) {

    Object.values(obj).forEach(val => {
        if (typeof val === 'object' && !Array.isArray(val)) {
            freezeObjectDeep(val)
        }
    })

    Object.freeze(obj)
}






/**
 * It is needed to make the statuses more human-friendly
 * For e.x.
 * input >>>
 *  {
 *   OK: 100,
 *   FAIL: 101,
 *   accounts: {
 *       EMAIL_EXISTS: 201
 *   }
 *  }
 * ... magic ...
 *
 * output >>>
 *  {
 *      OK: { code: 100, message: OK },
 *      FAIL: { code: 101, message: 101 },
 *      accounts: {
 *          EMAIL_EXISTS: { code: 201, message: 201}
 *      }
 *  }
 * @param values {Object}
 * @returns {Object}
 */
function addMessagesToValues (values) {
    Object.entries(values).forEach(([status, numeric_value]) => {

        /** when we have a real <status-name>: <numeric-code> pair on the top level */
        if (typeof values[status] === 'number') {
            values[status] = {code: numeric_value, message: status}
            /** if it is an object instead of the pair, we'll make a recursive call */
        } else {
            values[status] = addMessagesToValues(values[status])
        }
    })

    return values
}


const codes = addMessagesToValues(statuses)


/** simply public comparison method which can short your RPC code ten times
 * @function codes.statusEqual
 * @param status1 {{code: Number, message: String}}
 * @param status2 {{code: Number, message: String}}
 * @returns boolean
 * */
codes.statusEqual = (status1, status2) => {
    if (!status1 || !status2 ||
        !status1.code || !status2.code ||
        !status1.message || !status2.message) return false

    return (status1.code === status2.code && status1.message === status2.message)
}




/** Deep freezing the codes before export to prevent the accidental changes */
freezeObjectDeep(codes)


export {codes}


