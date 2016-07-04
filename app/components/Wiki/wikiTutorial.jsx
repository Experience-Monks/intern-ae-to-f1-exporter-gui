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
          <h1 className={styles.h1}>AE Animation Creation Tutorial</h1>
            <p className={styles.p}>This tutorial will walk you through different kind of animations that are possible with the exporter. The project file is available for download <a href="https://github.com/nascherman/my-pics/blob/master/ae-to-f1-exporter-gui/projects/multi_export_test.zip?raw=true">Here</a></p>
            <h1 className={styles.h1}>1 - Creating a simple project</h1>
            <h5 className={styles.h5}>Creating compositions and adding assets</h5>
            <p className={styles.p}>Your first project will only have 3 transition, out, idle and rotate. These states are expressed as a single composition. Create a composition in your new project and name it &#x27;out_to_idle.&#x27; Create an &#x27;images&#x27; folder and add import .png or .jpg file to the folder; add the image to the composition.</p>
            <h5 className={styles.h5}>Keyframes and animations</h5>
            <p className={styles.p}>Animation are accomplished using keyframes and changing transform properties. The properties that are enabled are
a. Position b. Scale c. Rotation d. Opacity e. Anchor Points. Set up two keyframes at the start and end of the composition. Translate the position from offscreen at the start of the keyframe and onscreen at the end keyframe. Apply easy-ease with F9.</p>
            <h5 className={styles.h5}>More than two keyframes in a composition</h5>
            <p className={styles.p}>A composition can have multiple keyframes.  Make a new composition called idle_to_rotate. Add a sequence of keyframes, changing the rotation each time like so, applying ease to each transition. Note that it is best to ENABLE 3d transforms for the composition. In this case, rotation is expressed as z-rotation.</p>
            <h5 className={styles.h5}>Wrapping up</h5>
            <p className={styles.p}>That&#x27;s it. It&#x27;s trivial to create new transitions with compositions. This tutorial project is included <a href="https://github.com/nascherman/my-pics/blob/master/ae-to-f1-exporter-gui/projects/tutorial.zip?raw=true">Here</a>
for reference. The other examples below demonstrate different effects and conventions of the exporter.</p>
            <h1 className={styles.h1}>2 - Examples</h1>
            <p className={styles.p}>Unzip the &#x27;multi_export_test&#x27; project folder and open the .aep file. There are four f1 components that will be exported as a result of this project. Opening the Ae-to-f1-exporter application and syncing the project will result in four projects showing up in the sidebar</p>
            <p className={styles.p}><img src="https://raw.githubusercontent.com/nascherman/my-pics/master/ae-to-f1-exporter-gui/ae-to-f1-multi-project.png" alt="3"/></p>
            <p className={styles.p}>-- multiple projects show up in the sidebar</p>
            <h5 className={styles.h5}>1 - jam</h5>
            <p className={styles.p}>The jam project is a simple demonstration of a single-asset component animation. It has two states, &#x27;idle_to_over&#x27; and &#x27;out_to_idle&#x27;. It&#x27;s similar to the tutorial project above but has changes in opacity and shows some interesting transforms.</p>
            <h5 className={styles.h5}>2 - ae-to-f1-sample</h5>
            <p className={styles.p}>This project uses a single asset duplicated many times, and features transforms in opacity and position. The states are the same as the &#x27;jam&#x27; component.</p>
            <h5 className={styles.h5}>3 - mustang-radio</h5>
            <p className={styles.p}>This radio button/toggle switch is an example of a ui element with many different states</p>
            <h5 className={styles.h5}>4 - slider</h5>
            <p className={styles.p}>This example features the use of video assets and a cycle of transitions. Notice that the transitions are numbered 0-3 and there is a transition from 0_to_1 as well as a transition from 3_to_0, so that states the transition between 3_to_0 paths correctly.</p>
            <h1 className={styles.h1}>3 - Things to note</h1>
            <ul className={styles.ul}>
              <li className={styles.li}>Composition that start from another compositions, end point should have the same transform properties. Eg if out_to_idle ends at position (x: 100,y: 100), idle_to_over should start at position (x: 100,y: 100). The same applies to rotation, opacity etc.</li>
              <li className={styles.li}>Compositions should always be defined as &#x27;transition_to_transition&#x27; (eg over_to_idle). If you don&#x27;t follow naming convention, the composition and its transition won&#x27;t be exported</li>
              <li className={styles.li}>Make sure that you collect all your files when sharing a project with another designer - <em>Dependencies -&gt; Collect Files</em></li>
              <li className={styles.li}>Test the pathing from different states to ensure it animates smoothly, you may need to add an extra composition to transition smoothly.</li>
              <li className={styles.li}>Supported Transforms: a. Position b. Scale c. Rotation d. Opacity e. Anchor Points.</li>
              <li className={styles.li}>Supported formats: Images(pngs,jpgs,gifs), Videos</li>
            </ul>
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
