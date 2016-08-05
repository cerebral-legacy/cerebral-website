import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

@Cerebral()
class App extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.mainHeader}>
          <div className={styles.title}>Welcome to the launch!</div>
          <div className={styles.subTitle}>make sense of complex apps</div>
        </div>
        <div style={{height: '200px'}}>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/rpKxVKGyVvs" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className={styles.content}>
          <div>
            <div>
              <strong>Read an article on Medium</strong>
            </div>
            <div>
              <a href="something" target="_new">The story of Cerebral</a>
            </div>
          </div>
          <div>
            <div>
              <strong>Read a success story</strong>
            </div>
            <div>
              <a href="https://gist.github.com/christianalfoni/b08a99faa09df054afe87528a2134730" target="_new">Cerebral - Made the impossible achievable</a>
            </div>
          </div>
          <div>
            <div>
              <strong>Dive into it!</strong>
            </div>
            <div>
              <a href="http://www.cerebraljs.com">The Cerebral website</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

 export default App;
