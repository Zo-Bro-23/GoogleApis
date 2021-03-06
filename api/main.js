const express = require('express')
const app = express()
const fs = require('fs')
const readline = require('readline')
const redirect_uri = 'http://localhost:5210/callback'
const client_details = require('../client_details.json')
const {google} = require('googleapis')
const SCOPES = [
    'https://mail.google.com/',
    // 'https://www.googleapis.com/auth/gmail.modify',
    // 'https://www.googleapis.com/auth/gmail.compose',
    // 'https://www.googleapis.com/auth/gmail.send',
]
const oauth2Client = new google.auth.OAuth2(client_details.client_id, client_details.client_secret, redirect_uri)
const authUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES})
function main (req, resp){
    resp.redirect(authUrl)
}

module.exports = main