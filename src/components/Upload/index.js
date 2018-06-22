import React, { Component } from 'react';

import video from '../../video.svg';
import './upload.css';

class Upload extends Component {
  constructor (props) {
    super(props);

    this.changeFile = this.changeFile.bind(this);
    this.changeByURL = this.changeByURL.bind(this);
    this.fileDrop = this.fileDrop.bind(this);

    this.state = {
      url: ''
    }
  }

  changeFile (e) {
    let file = e.target.files[0];
    if (file) {
      this.setState({ url: file.name });
      const vid = URL.createObjectURL(file);
      this.props.onVideoSelect(vid);
    }
  }

  changeByURL (e) {
    let url = e.target.value;
    this.props.onVideoSelect(url);
  }

  fileDrop (e) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (file) {
      this.setState({ url: file.name });
      const vid = URL.createObjectURL(file);
      this.props.onVideoSelect(vid);
    }
  }

  preventLeave (e) {
    e.preventDefault();
  }

  render() {
    return (
      <section className="container upload"
        onDragOver={this.preventLeave}
        onDrop={this.fileDrop}>
        <figure>
          <img className="icon" src={video} alt="videoclip blue icon" />
          <figcaption><h2>Drag your video here</h2></figcaption>
        </figure>
        <form>
          <header>Or just insert the link here</header>
          <input type="url" onChange={this.changeByURL} />
          <input type="file" onChange={this.changeFile} />
          { (this.state.url.length > 0) && <button>Start</button> }
        </form>
      </section>
    )
  }
}

export default Upload;
