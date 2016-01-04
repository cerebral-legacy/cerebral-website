var React = require('react');

var contributorStyle = {display: 'inline-block', verticalAlign: 'top', maxWidth: 350, margin: 15};
var contributorImageStyle = {width: 150};
var Contributors = React.createClass({
  render: function () {
    return (
      <div>
        <div style={contributorStyle}>
          <h3>Christian</h3>
          <img src="christian.jpeg" style={contributorImageStyle}/>
          <p>
            The guy who initially started the project.
          </p>
          <a href="https://github.com/christianalfoni">Github Profile</a>
        </div>
        <div style={contributorStyle}>
          <h3>Aleksey</h3>
          <img src="guria.jpg" style={contributorImageStyle}/>
          <p>
            Aleksey always goes straight to the point and there is nothing stopping him from
            bringing new great features into the project. This guy is the reason we have such a
            great router in Cerebral.
          </p>
          <a href="https://github.com/guria">Github Profile</a>
        </div>
        <div style={contributorStyle}>
          <h3>Garth</h3>
          <img src="garth.jpg" style={contributorImageStyle}/>
          <p>
            Garth has been with us from the start. He was one of the early adopters who bet his new found project on Cerebral.
            He has also built a <a href="https://github.com/garth/material-components">state driven material-ui project</a>.
            It is really the only React UI library I know of that controls all its components state using props.
          </p>
          <a href="https://github.com/garth">Github Profile</a>
        </div>
        <div style={contributorStyle}>
          <h3>Brian</h3>
          <img src="brian.jpeg" style={contributorImageStyle}/>
          <p>
            Not the guy with most code contributions, but he compensates with great spirit.
            He refers to himself as the Cerebral cheerleader. That said, Brian is a reflected and
            smart guy who always brings great insights and perspectives to our discussions!
          </p>
          <a href="https://github.com/bfitch">Github Profile</a>
        </div>
        <div style={contributorStyle}>
          <h3>Andrew</h3>
          <img src="andrew.jpeg" style={contributorImageStyle}/>
          <p>
            Andrew has contributed by nailing some bugs "deep down" and cleaning up projects as Cerebral moves on, ensuring a good experience for beginners.
          </p>
          <a href="https://github.com/abalmos">Github Profile</a>
        </div>
        <h3>Everybody else!</h3>
        <p>
          I would also like to express my thanks to everybody else who contributes with thoughts and ideas, scenarios they want solved and generally just being really nice people. Running open source projects can often feel unmanageable and honestly Cerebral is no different, but the great feedback and the enthusiasm makes it all worth it!
        </p>
      </div>
    );
  }
});

module.exports = Contributors;

/*
### Brian
![brian](brian.jpeg)

Not the guy with most code contributions, but he compensates with great spirit. He refers to himself as the Cerebral cheerleader. That said, Brian is a reflected and smart guy who always brings great insights and perspectives to our discussions!

[Github Profile](https://github.com/bfitch)

#### Everbody else

*/
