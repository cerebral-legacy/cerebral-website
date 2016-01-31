var React = require('react');
var Header = require('./Header.js');

var Home = React.createClass({
  render: function () {
    return (
      <div id="home" className="container">
        <section>
          <h1>Cerebral</h1>

          <div className="row">
            <div className="four columns">
              <h3>State</h3>
              <p className="text-small">
                Applications are stateful. The application needs to know what page to display,
                if a dropdown is opened or you are currently getting some data from the server. With
                Cerebral you define all the state of your application in one state tree. Think of it like
                a client database, but it holds all the data your applications needs, even if it is just for
                the client.
              </p>
            </div>
            <div className="four columns">
              <div className="main-logo"><img src="./logo.png" /></div>
            </div>
            <div className="four columns">
              <h3>UI</h3>
              <p className="text-small">
                The UI is produced using the application state. It is passed to a render function or exposed
                to a template. When you want your UI to change, your application state has to change. Your application
                listens to UI events and uses <i>Cerebral</i> to execute the state update. After an update is complete
                the UI will render the new state of the application.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="center">Express your application flow with signals</h2>
          <div className="row">
            <div className="four columns">
              <Header>Packages</Header>
              <div className="row">
                <div className="six columns">
                  <ul className="divided cerebral-list">
                    <li><i className="icon icon-television"/> React</li>
                    <li><i className="icon icon-television"/> Angular</li>
                    <li><i className="icon icon-television"/> Inferno</li>
                    <li><i className="icon icon-television"/> Snabbdom</li>
                  </ul>
                </div>
                <div className="six columns">
                  <ul className="divided cerebral-list">
                    <li><i className="icon icon-database"/> Baobab</li>
                    <li><i className="icon icon-database"/> ImmutableJS</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="four columns">
              <Header>What is Cerebral?</Header>
              <div className="clip" onClick={this.props.openVideo.bind(null, 'https://www.youtube.com/embed/kx8XoX_hV5s')}>
                <i className="icon icon-play-circle-o"/>
              </div>
            </div>
            <div className="four columns">
              <Header>Introductions</Header>
              <ul className="cerebral-list">
                <li>
                  <i
                    className="icon icon-file-text link"
                    onClick={() => window.open('https://gist.github.com/christianalfoni/e8dc5bfa79e7289a6258')}> Redux and Cerebral</i>
                </li>
                <li>
                  <i
                    className="icon icon-play-circle-o link"
                    onClick={this.props.openVideo.bind(null, 'https://www.youtube.com/embed/BfzjuhX4wJ0?start=20690&end=22260')}> ReactiveConf2015 Talk - <small>30:00</small></i>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
});

module.exports = Home;
