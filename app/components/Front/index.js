import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Tabs from '../Tabs';
import Markdown from '../Markdown';

const quotes = [{
  name: 'Nathan Bird',
  company: 'Ducky',
  text: 'The debugger gives me really great insight into how our application works, also the stuff my team mates has implemented'
}, {
  name: 'Chris Fricke',
  company: 'Stem',
  text: 'As a core part of our stack, Cerebral was integral in modularizing and scaling our complex application to adapt to our growing user base'
}];

@Cerebral()
class App extends React.Component {
  render() {
    const quote = quotes[Math.floor(Math.random() * (quotes.length))];

    return (
      <div className={styles.wrapper}>
        <div className={styles.mainHeader}>
          <img height="50%" src="/cerebral.png" />
          <div className={styles.title}>Cerebral</div>
          <div className={styles.subTitle}>make sense of complex apps</div>
          <div className={styles.buttonContainer}>
            <div
              className={styles.button}
              onClick={() => window.open('/todomvc')}
            >
              TRY THE DEMO
            </div>
            <div
              className={styles.button}
              onClick={() => this.props.signals.introductionClicked()}
            >
              TUTORIAL
            </div>
            <div
              className={styles.button}
              onClick={() => this.props.signals.getStartedClicked()}
            >
              GET STARTED
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <Markdown filename="front_model.md" />
            <Tabs tabs={[{
              label: 'controller.js',
              render: () => <Markdown filename="front_model_code.md" />
            }, {
              label: 'Debugger',
              render: () => <Markdown filename="front_model_debugger.md" />
            }]} />
          </div>
          <div className={styles.row}>
            <Tabs tabs={[{
              label: 'submitNewItemTitle.js',
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
              label: 'Snabbdom',
              render: () => <Markdown filename="front_view_snabbdom.md" />
            }, {
              label: 'Inferno',
              render: () => <Markdown filename="front_view_inferno.md" />
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
            <div className={styles.companies}>
              <img src="/company_ducky.png" />
              <img src="/company_kbd.png" />
              <img src="/company_salespreso.png" />
              <img src="/company_stem.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

 export default App;
