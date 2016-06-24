clickHandler = () => {
		let _this = this;
		const params = {
			email: emailSettings.installed.email,
			password: emailSettings.installed.password,
			clientId: emailSettings.installed.client_id,
			clientSecret: emailSettings.installed.client_secret,
			scope: emailSettings.installed.scope
		};

		const oauth2Client = new OAuth2(
			emailSettings.installed.client_id,
			emailSettings.installed.client_secret,
			emailSettings.installed.redirect_uris
		);
		const redirectUri = oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.google.com/m8/feeds/'
		});
		authWindow.loadURL(redirectUri);
		authWindow.show();
		authWindow.webContents.on('will-navigate', function (event, url) {
		  _this.handleUrlCallback(event, url);
		  console.warn('will navigate');
		});
		authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
		  	let code = _this.handleUrlCallback(event, newUrl);
		  	oauth2Client.getToken(code, (err, tokens) => {
		  		if(err) console.warn(err);
		  		else {
		  			oauth2Client.setCredentials(tokens);
		  		}
		  	});
		});
	}\


	import React from 'react';
import style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as EmailActions from '../actions/email';
import nodeMailer from 'node-mailer';
import emailSettings from '../../utils/ae-to-f1-exporter-gui-credentials.json';

import google from 'googleapis';
import request from 'request';
//function JWT(email, keyFile, key, scopes, subject) {
const jwtClient = new google.auth.JWT(emailSettings.client_email, null, emailSettings.private_key, ['https://www.googleapis.com/auth/contacts.readonly', 'https://mail.google.com/'], 'nick.scherman@jam3.com');

const authorize = require('google-service-account')({
	credentials: emailSettings,
	scopes: ['https://www.googleapis.com/auth/contacts.readonly']
});

const {BrowserWindow} = require('electron').remote;
let authWindow = new BrowserWindow({ 
	width: 600, 
	height: 400, 
	show: false, 
	'node-integration': false 
});

// Reset the authWindow on close
authWindow.on('close', function() {
    authWindow = null;
}, false);


class EmailForm extends React.Component {
	state = {
		tokens: []
	}

	clickHandler = () => {
		let _this = this;
		console.log(jwtClient);
		console.log(google);
		const gmail = google.gmail({version: 'v1', auth: jwtClient});
		const drive = google.drive({ auth: jwtClient });
		const params = {
			userId: 'me'
		};
		gmail.users.getProfile(params, (profile) => {
			console.log(profile);
		});
		drive.files.list
		//authorize(function (err, headers) {
		//  request({
		//    method: "GET",
		//    uri: "https://www.googleapis.com/auth/contacts.readonly",
		//    headers: headers
		//  }, function (resp) {
		//    console.log(resp);
		//  })
		//})
		
	}

	handleUrlCallback = (event, url) => {
		let code = url.split('code=');
		code = code[code.length-1];
		return code;
	}

	render() {
		return (
			<div className={style.email} onClick={this.clickHandler.bind(this)}>
				SEND TO: 
				<div className={style.box}>
					Email
				</div>
			</div>
		);
	}
}
export default EmailForm;
// export defaults EmailFormContainer;

import request from 'request';
//function JWT(email, keyFile, key, scopes, subject) {
const jwtClient = new google.auth.JWT(emailSettings.client_email, null, emailSettings.private_key, ['https://www.googleapis.com/auth/contacts.readonly', 'https://mail.google.com/'], 'nick.scherman@jam3.com');

const authorize = require('google-service-account')({
	credentials: emailSettings,
	scopes: ['https://www.googleapis.com/auth/contacts.readonly']
});

const {BrowserWindow} = require('electron').remote;
let authWindow = new BrowserWindow({ 
	width: 600, 
	height: 400, 
	show: false, 
	'node-integration': false 
});

   //const smtpTransport = nodeMailer.createTransport('SMTP', {
    //  service: 'Gmail',
    //  auth: {
    //    user: emailSettings.installed.email,
    //    pass: emailSettings.installed.password
    //  }
    //});

    //const smtpTransport = nodeMailer.createTransport('smtps://' + emailSettings.installed.email + 
    //  '%40gmail.com:' + emailSettings.installed.pass + '@smtp.gmail.com');
//
//    //const options = {
//    //  from: emailSettings.installed.email,
//    //  to: 'nick.scherman@jam3.com',
//    //  subject: 'Ae to f1 exporter ' + this.props.previewType + ' output',
//    //  text: this.refs.description.value
    //};

    //smtpTransport.sendMail(options, (err, resp) => {
    //  if(err) console.warn(err);
    //  else {
    //    consloe.log(resp);
    //  }
    //});