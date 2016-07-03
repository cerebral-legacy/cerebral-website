import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import classNames from 'classnames';
import icons from '../../common/icons.css';

const contributors = [{
  name: 'Christian',
  description: 'The guy who initially started the project.',
  imageLink: '/christian.jpeg',
  githubLink: 'https://github.com/christianalfoni'
}, {
  name: 'Aleksey',
  description: 'Aleksey always goes straight to the point and there is nothing stopping him from bringing new great features into the project. This guy is the reason we have such a great router in Cerebral. He also decoupled the core project into modules and is responsible for structuring all the repos with standards, commitizen and tests.',
  imageLink: '/guria.jpg',
  githubLink: 'https://github.com/guria'
}, {
  name: 'Garth',
  description: 'Garth has been with us from the start. He was one of the early adopters who bet his new found project on Cerebral. He has also built a <a target="_blank" href="https://github.com/garth/material-components">state driven material-ui project</a>. It is really the only React UI library I know of that controls all its components state using props. Garth also works on the addons package for Cerebral, fuse and other modules.',
  imageLink: '/garth.jpg',
  githubLink: 'https://github.com/garth'
}, {
  name: 'Brian',
  description: 'Not the guy with most code contributions, but he compensates with great spirit. He refers to himself as the Cerebral cheerleader. That said, Brian is a reflected and smart guy who always brings great insights and perspectives to our discussions!',
  imageLink: '/brian.jpeg',
  githubLink: 'https://github.com/bfitch'
}, {
  name: 'Andrew',
  description: 'Andrew has contributed by nailing some bugs "deep down" and cleaning up projects as Cerebral moves on, ensuring a good experience for beginners. Andrew also contributes to modules, specifically the forms module for Cerebral.',
  imageLink: 'andrew.jpeg',
  githubLink: 'https://github.com/abalmos'
}, {
  name: 'Delaney',
  description: 'Delaney has been working hard on the Falcor module, giving a cutting edge experience with data driven applications. He is also part of day to day discussions on where the project is heading.',
  imageLink: 'delaney.jpeg',
  githubLink: 'https://github.com/delaneyj'
}, {
  name: 'Adam',
  description: 'Adam has solved some core issues with the Chrome Extension and generally involves himself in supporting developers of Cerebral and other discussions on new modules and the core project. He also made the website mobile friendly!',
  imageLink: 'adam.png',
  githubLink: 'https://github.com/NervosaX'
}]

@Cerebral()
class Contributors extends React.Component {
  renderContributors() {
    return contributors.map((contributor, index) => {
      return (
        <div className={styles.contributor} key={index}>
          <h3 className={styles.nameMobile}>{contributor.name}</h3>
          <div className={styles.row}>
            <div className={styles.image} style={{backgroundImage: `url(${contributor.imageLink})`}}></div>
            <div className={styles.description}>
              <h3 className={styles.name}>{contributor.name}</h3>
              <div dangerouslySetInnerHTML={{__html: contributor.description}}></div>
              <a className={styles.githubLink} target="_blank" href={contributor.githubLink}>Github Profile</a>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <div className={styles.logo} onClick={() => this.props.signals.rootRouted()}>
              <img src="/cerebral.png" />
              <div className={styles.title}>Cerebral</div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h2 className={styles.pageTitle}>Contributors</h2>
          {this.renderContributors()}
          <div className={styles.everybodyElseWrapper}>
            <h3>Everybody else!</h3>
            <div>
              I would also like to express my thanks to everybody else who contributes with thoughts and ideas,
              scenarios they want solved and generally just being really nice people.
              Running open source projects can often feel unmanageable and honestly Cerebral is no different,
              but the great feedback and the enthusiasm makes it all worth it!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contributors;
