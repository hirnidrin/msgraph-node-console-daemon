const axios = require('axios');

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 * @param {string} accessToken
 */
async function callApi(endpoint, accessToken) {

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    console.log('Request made to web API at: ' + new Date().toString());

    try {
        const response = await axios.get(endpoint, options);
        console.log('Response HTTP status code: ' + response.status)
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 * @param {string} accessToken
 * @param {string} data
 */
async function postApi(endpoint, accessToken, data) {

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    console.log('Request made to web API at: ' + new Date().toString());

    try {
        const response = await axios.post(endpoint, data, options);
        console.log('Response HTTP status code: ' + response.status)
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

module.exports = {
    callApi: callApi,
    postApi: postApi
};
