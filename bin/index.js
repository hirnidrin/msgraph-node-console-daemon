#!/usr/bin/env node

// read in env settings
require('dotenv').config()

const yargs = require('yargs')

const fetch = require('./fetch')
const auth = require('./auth')

const options = yargs
  .usage('Usage: --op <operation_name>')
  .option('op', { alias: 'operation', describe: 'operation name', type: 'string', demandOption: true })
  .argv

async function main () {
  console.log(`You have selected: ${options.op}`)

  switch (yargs.argv.op) {
    case 'getUsers':
      try {
        // here we get an access token
        const authResponse = await auth.getToken(auth.tokenRequest)
        // call the web API with the access token
        const uri = process.env.GRAPH_ENDPOINT + '/v1.0/users'
        const result = await fetch.callApi(uri, authResponse.accessToken)
        // display result
        console.log(result)
      } catch (error) {
        console.log(error)
      }
      break
    case 'getUser':
      try {
        // setup the action
        const upn = process.env.MAIL_FROM
        const uri = process.env.GRAPH_ENDPOINT + `/v1.0/users/${upn}`
        // here we get an access token
        const authResponse = await auth.getToken(auth.tokenRequest)
        // call the web API with the access token
        const result = await fetch.callApi(uri, authResponse.accessToken)
        // display result
        console.log(result)
      } catch (error) {
        console.log(error)
      }
      break
    case 'sendMail':
      try {
        // setup the action
        const upn = process.env.MAIL_FROM
        const uri = process.env.GRAPH_ENDPOINT + `/v1.0/users/${upn}/sendMail`
        // setup the mail
        const msg = {
          message: {
            subject: 'Mail thru MS Graph API',
            body: {
              contentType: 'Text',
              content: 'The new cafeteria is open :)'
            },
            toRecipients: [
              {
                emailAddress: {
                  address: process.env.MAIL_TO
                }
              }
            ]
          }
        }
        // here we get an access token
        const authResponse = await auth.getToken(auth.tokenRequest)
        // call the web API with the access token
        const result = await fetch.postApi(uri, authResponse.accessToken, msg)
        // display result
        console.log(result)
      } catch (error) {
        console.log(error)
      }
      break
    default:
      console.log('Available operations: getUsers | getUser | sendMail')
      break
  }
};

main()
