import React from 'react';
import style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import appSettings from '../../utils/app-credentials.json';

import nodemailer from 'nodemailer';
import xoauth2 from 'xoauth2';
import google from 'googleapis';
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(appSettings.web.client_id, appSettings.web.client_secret, 'http://localhost');

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
// const transporter = nodemailer.createTransport('smtps://nick.scherman%40jam3.com:Dtbsdde1!@smtp.gmail.com');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		xoauth2: xoauth2.createXOAuth2Generator({
			user: 'nick.scherman@jam3.com',
			clientID: appSettings.web.client_id,
			clientSecret: appSettings.web.client_secret,
			refreshToken: 'salonica'
		})
	}
});
// import * as EmailActions from '../actions/email';
 
// import contactsList from '../utils/contactList';

// postmaster@sandbox72bae3079f0b4052a4352514ef3f236b.mailgun.org

class EmailForm extends React.Component {
	state = {
		tokens: []
	}

	clickHandler = () => {
		let _this = this;
		const mailOptions = {
			from: 'nick.scherman@jam3.com', // sender address
			to: 'n_scherman@hotmail.com', // list of receivers
			subject: 'Hello', // Subject line
			text: 'Hello world', // plaintext body
			attachments: [{
				filename: 'test.js',
				path: __dirname + '/utils/arrNoDupe.js'
			}]
		};

		transporter.verify((err, resp) => {
			if(err) console.warn(err);
			console.log(resp);
		});

		//transporter.sendMail(mailOptions, (err, rep) => {
		//	if(err) console.warn(err);
		//	console.log(rep);
		//});
		
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