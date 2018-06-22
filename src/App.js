import React, { Component } from 'react';

import Clipper from './components/Clipper';
import Upload from './components/Upload';
import 'milligram/dist/milligram.min.css';

class App extends Component {

  constructor () {
    super();

    this.updateVideo = this.updateVideo.bind(this);

    this.state = {
      uploaded: null
    }
  }

  updateVideo(url) {
    this.setState({
      uploaded: url
    })
  }

  render() {
    return (
      <div className="App">
        {
          !!(this.state.uploaded) ?
          <Clipper firstClip={this.state.uploaded} /> :
          <Upload onVideoSelect={this.updateVideo} />
        }
      </div>
    );
  }
}

export default App;
