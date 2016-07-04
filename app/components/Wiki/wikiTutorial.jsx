import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './style.css';
import animate from 'gsap-promise';

import * as WikiActions from '../../actions/wiki';

class WikiTutorial extends Component {
  static propTypes = {
    currentWiki: React.PropTypes.string,
    setWiki: React.PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.wiki === 'tutorial') {
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
          <h1 className={styles.h1}>Tutorial</h1>
            <p className={styles.p}>This tutorial will walk you through different kind of animations that are possible with the exporter. The project file is available for download <a className={styles.a} href="https://github.com/nascherman/my-pics/blob/master/ae-to-f1-exporter-gui/projects/multi_export_test.zip?raw=true">Here</a></p>
            <h1 className={styles.h1}>1 - Creating a simple project</h1>
            <h3 className={styles.h3}>a</h3>
            <p className={styles.p}>Your first project will only have 3 transition, out, idle and rotate. These states are expressed as a single composition. Create a composition in your new project and name it &#x27;out_to_idle.&#x27; Create an &#x27;images&#x27; folder and add import .png or .jpg file to the folder; add the image to the composition.</p>
            <h3 className={styles.h3}>b</h3>
            <p className={styles.p}>Animation are accomplished using keyframes and changing transform properties. The properties that are enabled are
a. Position b. Scale c. Rotation d. Opacity e. Anchor Points. Set up two keyframes at the start and end of the composition. Translate the position from offscreen at the start of the keyframe and onscreen at the end keyframe. Apply easy-ease with F9.</p>
            <h3 className={styles.h3}>c</h3>
            <p className={styles.p}>A composition can have multiple keyframes.  Make a new composition called idle_to_rotate. Add a sequence of keyframes, changing the rotation each time like so, applying ease to each transition. Note that it is best to ENABLE 3d transforms for the composition. In this case, rotation is expressed as z-rotation.</p>
            <h3 className={styles.h3}>d</h3>
            <p className={styles.p}>That&#x27;s it. It&#x27;s trivial to create new transitions with compositions. This tutorial project is included <a className={styles.a} href="https://github.com/nascherman/my-pics/blob/master/ae-to-f1-exporter-gui/projects/tutorial.zip?raw=true">Here</a>
for reference. The other examples below demonstrate different effects and conventions of the exporter.</p>
            <h1 className={styles.h1}>2 - Examples</h1>
            <p className={styles.p}>Unzip the &#x27;multi_export_test&#x27; project folder and open the .aep file. There are four f1 components that will be exported as a result of this project. Opening the Ae-to-f1-exporter application and syncing the project will result in four projects showing up in the sidebar</p>
            <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-multi-project.png" alt="3"/></p>
            <p className={styles.p}>-- multiple projects show up in the sidebar</p>
            <h3 className={styles.h3}>1 - jam</h3>
            <p className={styles.p}>The jam project is a simple demonstration of a single-asset component animation. It has two states, &#x27;idle_to_over&#x27; and &#x27;out_to_idle&#x27;. It&#x27;s similar to the tutorial project above but has changes in opacity and shows some interesting transforms.</p>
            <h3 className={styles.h3}>2 - ae-to-f1-sample</h3>
            <p className={styles.p}>This project uses a single asset duplicated many times, and features transforms in opacity and position.</p>
            <h3 className={styles.h3}>3 - mustang-radio</h3>
            <p className={styles.p}>This radio button/toggle switch is an example of a ui element with many different states</p>
            <h3 className={styles.h3}>4 - slider</h3>
            <p className={styles.p}>This example features the use of video assets and a cycle of transitions. Notice that the transitions are numbered 0-3 and there is a transition from 0_to_1 as well as a transition from 3_to_0, so that states the transition between 3_to_0 paths correctly.</p>
            
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    wiki: state.wiki,
    setWiki: state.wiki
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, WikiActions), dispatch);
}

const WikiContainer = connect(mapStateToProps, mapDispatchToProps)(WikiTutorial);

export default WikiContainer;
