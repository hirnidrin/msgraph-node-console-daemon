#!/usr/bin/env node

import 'dotenv/config' // import dotenv module and parse .env -> process.env.ABCs are populated
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as auth from './auth.js'
import * as fetch from './fetch.js'

// setup the argv parser, typescript async style
// see https://github.com/yargs/yargs/blob/main/docs/typescript.md
const parser = yargs(hideBin(process.argv))
  .usage('Usage: --op <operation_name>')
  .option('op', { alias: 'operation', describe: 'operation name', type: 'string', demandOption: true })

// run the cli program
async function main () {
  // get the args
  const argv = await parser.parse()
  console.log(`Selected operation: ${argv.op}`)
  // run the chosen operation
  switch (argv.op) {
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
        // sendMail returns no data, only HTTP status 202... or raises an error
        await fetch.postApi(uri, authResponse.accessToken, msg)
      } catch (error) {
        console.log(error)
      }
      break
    default:
      console.log('Select an available operation: getUsers | getUser | sendMail')
      break
  }
}

main()
