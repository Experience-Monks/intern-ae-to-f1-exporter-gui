import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './style.css';
import animate from 'gsap-promise';

import * as WikiActions from '../../actions/wiki';

class WikiFeatures extends Component {
  static propTypes = {
    wiki: React.PropTypes.string,
    setWiki: React.PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.wiki === 'instructions') {
      this.animateIn();
    }
    else {
      this.animateOut();
    }
  }

  handleClick = (page) => {
    page = page || '';
    this.props.setWiki(page);
  }

  animateIn = () => {
    animate.to(this.refs.wiki, 0.5, { top: '0%'});
  }

  animateOut = () => {
    animate.to(this.refs.wiki, 0.5, { top: '100%'});
  }

  render() {
    return (
      <div className={styles.container} ref='wiki'>
        <h3 className={styles.goBack} onClick={this.handleClick}> Close </h3>
        <div className={styles.mardownBody}>
          <h1 className={styles.h1}>Usage Instructions</h1>
          <h1 className={styles.h1}>1</h1>
          <p className={styles.p}>Open an After Effects project that is compatible with the ae-to-f1 exporter. If you're not sure what kind of compositions, assets etc. are compatible with the exporter, check out the <h3 className={styles.goBack} onClick={() => this.handleClick('features')}> Features  and Rules</h3></p>
          <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-initial.png" alt="1" /></p>
          <ul>
          <li>start by hitting the &quot;Synchronize&quot; button after loading you project</li>
          </ul>
          <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-project.png" alt="2" /></p>
          <ul>
          <li>an example of a valid project</li>
          </ul>
          <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-multi-project.png" alt="3" /></p>
          <ul>
          <li>an example of a valid project with multiple compositions</li>
          </ul>
          <h1 className={styles.h1}>2</h1>
          <p className={styles.p}>Select your output as either ReactF1 or F1Dom depending on your requirements using the toggle switch. The 'flavour' is displayed as text on either side of the toggle.</p>
          <h1 className={styles.h1}>3</h1>
          <p className={styles.p}>When you are ready to export, hit the button labelled &quot;Synchronize&quot; in the top left. Wait until the button finishes synchronizing and displays 'Synchronized.' Afterwards, if you want to sync again, just hit the button again.</p>
          <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-synching.png" alt="4" /></p>
          <h1 className={styles.h1}>4</h1>
          <p className={styles.p}>At this stage, you will either have a working preview displayed or a relevant error message will be displayed to help you determine the cause of the error. You can transition between the various preview states by hitting the select buttons or pressing the corresponding number key on the keyboard.</p>
          <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-complete.png" alt="5" /></p>
          <h1 className={styles.h1}>5</h1>
          <p className={styles.p}>You can now hit the download button to download the component locally or email the project to someone by entering their email and hitting submit. To download, hit the download button. A popup opens and you must select the output path, hit ok and it will download.</p>
          <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-download.png" alt="6" /></p>
          <h1 className={styles.h1}>6</h1>
          <p className={styles.p}>To email your compositions, you can both enter the email address into the email entry area or select an addresses from the list of known emails.</p>
          <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-email.png" alt="7" /></p>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wiki: state.wiki
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, WikiActions), dispatch);
}

const WikiContainer = connect(mapStateToProps, mapDispatchToProps)(WikiFeatures);

export default WikiContainer;

