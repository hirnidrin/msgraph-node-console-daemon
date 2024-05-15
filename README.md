# MS Graph Node Console Daemon

Simple Node.js CLI app that accesses MS Graph using "confidential client credentials" authentication.
Basically this [https://learn.microsoft.com/en-us/entra/identity-platform/tutorial-v2-nodejs-console](https://learn.microsoft.com/en-us/entra/identity-platform/tutorial-v2-nodejs-console) with minor additions.

## Setup

* Clone from Github.
* Enter the app folder and run `yarn install`.
* Copy `.env.example` to `.env` and set the vars.

## Use

Run `node . --op operation` where _operation_ is one of 
* `getUsers` -- List of all users in the tenant. See [https://learn.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=http](https://learn.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=http)
* `getUser` -- Details of the `.env:MAIL_FROM` user, may be a shared mailbox. See [https://learn.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http](https://learn.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http)
* `sendMail` -- Sends a test message from `.env:MAIL_FROM` to `.env:MAIL_TO`. See [https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0&tabs=http](https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0&tabs=http)
