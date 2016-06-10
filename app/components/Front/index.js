import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Tabs from '../Tabs';
import Markdown from '../Markdown';

const quotes = [{
  name: 'Nathan Bird',
  company: 'Ducky',
  text: 'Woop woop, it works like a charm!'
}];

@Cerebral()
class App extends React.Component {
  render() {
    const quote = quotes[Math.floor(Math.random() * (quotes.length - 1))];

    return (
      <div className={styles.wrapper}>
        <div className={styles.mainHeader}>
          <img height="50%" src="/cerebral.png" />
          <div className={styles.title}>Cerebral</div>
          <div className={styles.subTitle}>make sense of complex apps</div>
          <div className={styles.buttonContainer}>
            <div className={styles.button}>TRY THE DEMO</div>
            <div className={styles.button}>INTRODUCTION</div>
            <div
              className={styles.button}
              onClick={() => this.props.signals.documentationClicked()}
            >
              GET STARTED
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <Markdown filename="front_model.md" />
            <Tabs tabs={[{
              label: 'main.js',
              render: () => <Markdown filename="front_model_code.md" />
            }, {
              label: 'Debugger',
              render: () => <Markdown filename="front_model_debugger.md" />
            }]} />
          </div>
          <div className={styles.row}>
            <Tabs tabs={[{
              label: 'main.js',
              render: () => <Markdown filename="front_controller_main.md" />
            }, {
              label: 'appMounted.js',
              render: () => <Markdown filename="front_controller_signal.md" />
            }, {
              label: 'Debugger',
              render: () => <Markdown filename="front_controller_debugger.md" />
            }]} />
            <Markdown filename="front_controller.md" />
          </div>
          <div className={styles.row}>
            <Markdown filename="front_view.md" />
            <Tabs tabs={[{
              label: 'React',
              render: () => <Markdown filename="front_view_react.md" />
            }, {
              label: 'Debugger',
              render: () => <Markdown filename="front_view_debugger.md" />
            }]} />
          </div>
        </div>
        <div className={styles.references}>
          <div className={styles.quote}>
            <div className={styles.quoteText}>
              "{quote.text}"
            </div>
            <div className={styles.quoteNameWrapper}>
              <span className={styles.quoteName}>- {quote.name},</span>
              <span className={styles.quoteCompany}> {quote.company}</span>
            </div>
          </div>
          <div className={styles.referenceSplitterWrapper}>
            <div className={styles.referenceLine} />
            <div className={styles.crazyAbout}>They are all pretty excited about Cerebral</div>
            <div className={styles.companies}><img src="/company_ducky.png" /></div>
          </div>
        </div>
      </div>
    );
  }
}

 export default App;
