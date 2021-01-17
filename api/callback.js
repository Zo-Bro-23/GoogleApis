const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
let refresh = ""
let access = ""
const fs = require('fs')
const readline = require('readline')
const redirect_uri = 'http://localhost:5210/callback'
const client_details = require('../client_details.json')
const {google} = require('googleapis')
const axios = require('axios')
const SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'openid', 'profile', 'email']
const oauth2Client = new google.auth.OAuth2(client_details.client_id, client_details.client_secret, redirect_uri)

 async function callback (req, resp){
        //  axios.post('https://oauth2.googleapis.com/token', {
        //     'code': req.query.code,
        //     'client_id': client_details.client_id,
        //     'client_secret': client_details.client_secret,
        //     'grant_type': 'authorization_code',
        //     'redirect_uri': 'http://localhost:5210/callback'
        //  })

        oauth2Client.getToken(req.query.code)

         .then(async (r) => {const tokens = r.res.data            
             refresh = tokens.refresh_token
             access = tokens.access_token
             id = tokens.id_token
             oauth2Client.setCredentials(tokens)
             const gmail = google.gmail({version: "v1", auth: oauth2Client })
             const messageParts = [
                'From: Justin Beckwith <beckwith@google.com>',
                'To: Zohan Subhash <zohan.subhash@gmail.com>',
                'Content-Type: text/html; charset=utf-8',
                'MIME-Version: 1.0',
                `Subject: Hey`,
                '',
                'This is a message just to say hello.',
                'So... <b>Hello!</b>',
             ]
             const message = messageParts.join('\n')
             const encodedMessage = Buffer.from(message).toString('base64')
             const res = await gmail.users.messages.send({userId: 'me', requestBody: {raw: encodedMessage}})
             console.log(res)
            
    })    }


module.exports = callback