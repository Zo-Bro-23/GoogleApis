//const axios = require('axios')
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
const { default: axios } = require('axios')
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'openid', 'profile', 'email']
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

         .then(r => {const tokens = r.res.data            
             refresh = tokens.refresh_token
             access = tokens.access_token
             id = tokens.id_token
             oauth2Client.setCredentials(tokens)
             const gmail = google.gmail({version: "v1"})
             gmail.users.messages.send({To: "zohan.subhash@gmail.com", From: "zohan.subhash@gmail.com", Subject: "Hi", Message: "Hey"})
            
    })    }


module.exports = callback