import React from 'react';
import style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import animate from 'gsap-promise';

import * as ContactsActions from '../../actions/setContacts';
import * as EmailActions from '../../actions/emailTo';

import contactList from '../../utils/contactList';
//AKIAJMGME3PSYMESR2KA
//AhOjHvoE8WkqSf+ViDwSb09lo2kAqRYx9dCfK0PUqWhZ

// AWSAccessKeyID: 'AKIAJ7JLOBQD3GNVZPSQ',
// AWSSecretKey: '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',
//const email = require('ses-email-sender')({
//	AWSAccessKeyID: 'AKIAJ7JLOBQD3GNVZPSQ',
//	AWSSecretKey: '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',
//	ServiceUrl: 'https://email-smtp.us-east-1.amazonaws.com',
//	port: '587'
//});

//const jwtClient = new google.auth.JWT(serviceKey.client_email, null, serviceKey.private_key, ['https://www.googleapis.com/auth/admin.directory.user.readonly', 'https://www.googleapis.com/auth/drive'], null);
//const admin = google.admin({version: 'directory_v1', auth: jwtClient }); 

class EmailForm extends React.Component {
	static propTypes = {
		emailContacts: React.PropTypes.array,
		emailTo: React.PropTypes.array,
		setContacts: React.PropTypes.func, 
		setEmailTo: React.PropTypes.func
	}

	state = {
		emailToggle: false,
		emailEntry: ''
	}

	componentWillMount() {
		//hardcoded contact list
		this.props.setContacts(contactList);
	}

	componentWillUpdate(nextProps, nextState) {
		if(nextState.emailToggle === true) {
			this.animateIn();
		}
		else {
			this.animateOut();
		}
	}

	animateIn = () => {
		TweenMax.killTweensOf(this.refs.emailBox);
		animate.to(this.refs.emailBox, 0.5, {height: '53vh', bottom: '53vh'});
		animate.to(this.refs.arrow, 0.5, {rotation: '180'});
	}

	animateOut = () => {
		TweenMax.killTweensOf(this.refs.emailBox);
		animate.to(this.refs.emailBox, 0.5, {height: '0', bottom: 0});
		animate.to(this.refs.arrow, 0.5, {rotation: 0});
	}

	onEmailClick = (email) => {
		let tempArr = [];
		if(this.props.emailTo.findIndex(x => x.email === email.email) === -1) {
			this.props.emailTo.forEach((item) => {
				tempArr.push(item);
			});
			tempArr.push(email);
		}
		else {
			this.props.emailTo.forEach((item) => {
				tempArr.push(item);
			});
			tempArr.splice(tempArr.findIndex(x => x.email === email.email), 1);
			
		}
		this.props.setEmailTo(tempArr);
	}

	toggleEmail = () => {
		this.setState({emailToggle: !this.state.emailToggle});
	}

	updateEmail = () => {
		const emailTo = this.props.emailTo;
		const entryVal = this.refs.emailEntry.value;
		const manualEntry = {
			name: 'manual',
			email: entryVal,
			manual: true
		};
		let tempArr = [];
		emailTo.forEach((item) => {
			tempArr.push(item);
		});
		let manualEmailIndex = tempArr.findIndex(x => x.manual === true);
		if(manualEmailIndex !== -1) tempArr.splice(manualEmailIndex, 1, manualEntry);
		else tempArr.push(manualEntry);
		
		this.props.setEmailTo(tempArr);
	}

	render() {
		const { emailContacts, emailTo } = this.props;
		const _this = this;
		const onEmailClick = this.onEmailClick;
		return (
			<div className={style.email}>
				<div className={style.labelContainer} onClick={this.toggleEmail.bind(this)}>
					<label className={style.label} >{'SEND TO: '} </label> 
				</div>
				<div className={style.box} onClick={this.toggleEmail.bind(this)}>
					<input 
						className={style.emailEntry} 
						placeholder="email"
						onChange={this.updateEmail.bind(this)} 
						type="text"
						ref="emailEntry"
					/>
				</div>
				<div className={style.arrow} onClick={this.toggleEmail.bind(this)} ref='arrow'></div>	
				
				<div className={style.box}>
					<div className={style.emailBox} ref="emailBox" >
						{
							emailContacts.map((item, index) => {
								const selected = emailTo.findIndex(x => x.email === item.email) !== -1;
								const listItemStyle = classnames(style.listItem, {
									[style.listItemSelected]: selected
								});
								return (
									<div 
										key={index} 
										className={listItemStyle}
										onClick={onEmailClick.bind(_this, item)}
									>
										{item.name}
									</div>
								);
							})
						}
					</div>
				</div>

			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        emailContacts: state.emailContacts,
        emailTo: state.emailTo,
        setContacts: state.emailContacts,
        setEmailTo: state.emailTo
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ContactsActions, EmailActions), dispatch);
}

const EmailFormContainer = connect(mapStateToProps, mapDispatchToProps)(EmailForm);

export default EmailFormContainer;
