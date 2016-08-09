import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './style.css';
import animate from 'gsap-promise';

import * as WikiActions from '../../actions/wiki';

class WikiFeatures extends Component {
  static propTypes = {
    currentWiki: React.PropTypes.string,
    setWiki: React.PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.wiki === 'features') {
      this.animateIn();
    }
    else {
      this.animateOut();
    }
  }

  handleClick = () => {
    this.props.setWiki('');
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
        <h1 className={styles.h1} className={styles.goBack} onClick={this.handleClick}> Close </h1>
           <div className={styles.markdownBody}><p className={styles.p}>The following a set of rules that should be followed when creating After Effects Projects that will be exported to F1 ui animations:</p>
          <h1 className={styles.h1}>1 </h1>
          <p className={styles.p}>Compositions should be named something like out_to_idle, out_to_over, etc. So basically two state names separated by <em>to</em>. The state names should not contain spaces or _ characters other than alphanumeric characters.</p>
          <p className={styles.p}>Bad composition names:</p>
          <p className={styles.p}><strong className={styles.strong}>start_state_to_end_state</strong></p>
          <p className={styles.p}><strong className={styles.strong}>start-state_to_end-state</strong></p>
          <p className={styles.p}><strong className={styles.strong}>idle_to_roll over</strong></p>
          <p className={styles.p}><strong className={styles.strong}>item’s_selected</strong></p>
          <p className={styles.p}><strong className={styles.strong}>$tate$pecial_to_#hasTagState</strong></p>
          <p className={styles.p}>Good composition names:</p>
          <p className={styles.p}><strong className={styles.strong}>idle_to_over</strong></p>
          <p className={styles.p}><strong className={styles.strong}>idle_to_disabled</strong></p>
          <p className={styles.p}><strong className={styles.strong}>over_to_selected</strong></p>
          <p className={styles.p}>You you can of course define different animations for a roll over and roll out by having two compositions:</p>
          <p className={styles.p}><strong className={styles.strong}>idle_to_over</strong></p>
          <p className={styles.p}><strong className={styles.strong}>over_to_idle</strong></p>
          <h1 className={styles.h1}>2</h1>
          <p className={styles.p}>Features in After Effects that you can animate: <br />
          a. Position <br />
          b. Scale <br />
          c. Rotation <br />
          d. Opacity <br />
          e. Anchor Points <br />
          (note you cannot currently add and animate masks)</p>
          <h1 className={styles.h1}>3</h1>
          <p className={styles.p}>Easing. There are two types of easing in After Effects. Temporal or time based easing (similar to ease equations) these are defined via the graph editor. Motion path easing or spatial easing these are defined via curves in the scene editor. Currently only temporal easing can be used (edited via graph/keyframe editor)</p>
          <h1 className={styles.h1}>4</h1>
          <p className={styles.p}>Layer types you can use currently:
          a. Image layers (no text layers, no solids, vector graphics, videos, etc.)</p>
          <h1 className={styles.h1}>5</h1>
          <p className={styles.p}>Layer order and naming should match between compositions. Lets say we had two compositions:</p>
          <p className={styles.p}><strong className={styles.strong}>idle_to_over</strong></p>
          <p className={styles.p}><strong className={styles.strong}>over_to_idle</strong></p>
          <p className={styles.p}>idle_to_over contains the following layers in the following order:</p>
          <p className={styles.p}><strong className={styles.strong}>foregroundImage</strong></p>
          <p className={styles.p}><strong className={styles.strong}>backgroundImage</strong></p>
          <p className={styles.p}><strong className={styles.strong}>backgroundBorder</strong></p>
          <p className={styles.p}>over_to_idle contains the following layers:</p>
          <p className={styles.p}><strong className={styles.strong}>backgroundImage</strong></p>
          <p className={styles.p}><strong className={styles.strong}>foregroundImage</strong></p>
          <p className={styles.p}><strong className={styles.strong}>background-border</strong></p>
          <p className={styles.p}>This would not export correctly. Both compositions should have layers named and matching each other like so:</p>
          <p className={styles.p}><strong className={styles.strong}>foregroundImage</strong></p>
          <p className={styles.p}><strong className={styles.strong}>backgroundImage</strong></p>
          <p className={styles.p}><strong className={styles.strong}>backgroundBorder</strong></p>
          <h1 className={styles.h1}>6</h1>
          <p className={styles.p}>Multiple Comps:
          You can export multiple compositions at once using a specific project structure. You must have a top level project folder and a series of folders beneath that level, each containing a separate composition to export. An example structure below.</p>
          <h1 className={styles.h1}>Project/</h1>
          <pre className={styles.pre}><code className={styles.code}>BlueButton/ <br />
          {'\tout_to_idle'} <br />
          {'\tidle_to_over'} <br />
          {'\tImages/'} <br />
          {'\t\tasset.png'} <br />
          {'RedButton/'} <br />         
          {'\tout_to_idle'} <br />          
          {'\tidle_to_over'} <br />         
          {'\tasset.png'} <br />
          </code></pre>
          <h1 className={styles.h1}>8 - Possible future features</h1>
          <p className={styles.p}>Implement entire page animation sequencing by having compositions that contain compositions
          Handle mask effects defined via paths
          Implement spatial tangents (motion paths for animation)
          Allow for different footage types eg text layers, video files, solids, vector graphics, etc</p>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wiki: state.wiki,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, WikiActions), dispatch);
}

const WikiContainer = connect(mapStateToProps, mapDispatchToProps)(WikiFeatures);

export default WikiContainer;

