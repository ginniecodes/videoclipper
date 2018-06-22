import React, { Component } from 'react';
import { HotKeys } from 'react-hotkeys';

import './player.css';

class Player extends Component {
  constructor (props) {
    super(props);

    this.generateSource = this.generateSource.bind(this);
    this.autoplay = this.autoplay.bind(this);
    this.hideLoader = this.hideLoader.bind(this);

    this.video = null;

    this.state = {
      loader: !!(props.loader)
    };
  }


  hideLoader() {
    this.setState({
      loader: false
    }, () => {
      this.video && this.video.play();
    });
  }

  componentDidMount() {
    if(this.props.loader) {
      this.hideLoader();
    }
  }

  componentDidUpdate() {
    if(this.props.loader) {
      setTimeout(this.hideLoader, 3000);
    }
  }

  generateSource() {
    let { start, end } = this.props;

    // state is immutable, 
    let url = '' + this.props.url;

    if (start > 0 || end > 0) {
      url += '#t=';
      if (start > 0) url += start;
      if (end > 0) url += ',' + end;
    }

    return url;
  }

  autoplay(e) {
    const { end } = this.props;
    const video = e.target;
    if (parseInt(video.currentTime) < end && !video.ended) {
      return ;
    }
    this.props.onNext();
  }

  pause(e) {
    return !(e.target.paused) ? e.target.pause() : e.target.play();
  }

  generateLoader() {
    return (
      <div className="loader"></div>
    )
  }

  render() {
    const { name, id } = this.props;

    const { loader } = this.state;

    const map = {
      space: ['space', 'intro']
    };

    const handler = {
      'space': this.autoplay
    };

    return (
      <article className="video">
        <header className="video-title"><h2>{name}</h2></header>
        <HotKeys keyMap={map} handlers={handler}>
          <video
            key={id}
            className={loader ? 'loading' : ''}
            ref={vid => this.video = vid}
            onPause={this.autoplay}
            onEnded={this.autoplay}
            onClick={this.pause}>
            <source src={this.generateSource()} />
          </video>
        </HotKeys>
        { loader && this.generateLoader() }
      </article>
    );
  }

  componentWillUnmount() {
    this.video = null;
  }
}

export default Player;
