import React from 'react';
import style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import animate from 'gsap-promise';

import * as ContactsActions from '../../actions/setContacts';

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
	}

	state = {
		emailToggle: false
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

	clickHandler = () => {
		let _this = this;
		console.log('todo AWS SES');
	}

	toggleEmail = () => {
		this.setState({emailToggle: !this.state.emailToggle});
	}

	render() {
		const  { emailContacts } = this.props;
		const emailBoxClass = classnames(style.emailBox, {
			[style.emailBoxOpen]: this.state.emailToggle,
			[style.emailBoxClosed]: !this.state.emailToggle
		});
		return (
			<div className={style.email} onClick={this.toggleEmail.bind(this)}>
				<label className={style.label} >{'SEND TO: '} </label> 
				<div className={style.arrow} ref='arrow'></div>
				<div className={style.box}>
					<div className={emailBoxClass} ref="emailBox" >
						{
							emailContacts.map((item, index) => {
								return (
									<div key={index} className={style.listItem}>
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
        setContacts: state.emailContacts
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ContactsActions), dispatch);
}

const EmailFormContainer = connect(mapStateToProps, mapDispatchToProps)(EmailForm);

export default EmailFormContainer;
