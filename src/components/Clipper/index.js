import React, { Component } from 'react';
import { HotKeys } from 'react-hotkeys';

import ClipEditor from './ClipEditor';
import ClipList from './ClipList';
import Player from '../Player';

import './clipper.css';

class Clipper extends Component {

  constructor(props) {
    super(props);

    this.nextVideo = this.nextVideo.bind(this);
    this.prevVideo = this.prevVideo.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.addClip = this.addClip.bind(this);
    this.editClip = this.editClip.bind(this);
    this.deleteClip = this.deleteClip.bind(this);
    this.saveClip = this.saveClip.bind(this);
    this.forgetClip = this.forgetClip.bind(this);
    this.toggleClipEditor = this.toggleClipEditor.bind(this);

    this.state = {
      clips: [
        {
          id: 0,
          url: props.firstClip,
          name: 'Full Video',
          start: 0,
          end: 0
        }
      ],
      playing: 0,
      editing: null,
      dialog: false
    };
  }

  componentDidMount() {
    const savedClips = this.storedClips();
    if (savedClips > 0) {
      this.setState(({ clips }) => ({
        clips: [...clips, ...savedClips]
      }))
    }
  }


  // media player options

  nextVideo() {
    if(this.state.playing < this.state.clips.length - 1) {
      this.setState(({ playing }) => ({
        playing: playing + 1
      }));
    }
  }

  prevVideo() {
    if(this.state.playing > 0) {
      this.setState(({ playing }) => ({
        playing: playing - 1
      }));
    }
  }

  updatePlayer(index) {
    this.setState({
      playing: index
    })
  }


  // clip options

  addClip(newClip) {
    if (!newClip.url) {
      newClip.url = this.props.firstClip;
    }

    newClip.id = this.state.clips[this.state.clips.length - 1].id + 1;

    this.setState({
      clips: this.state.clips.concat(newClip)
    });

    this.toggleClipEditor();
  }

  editClip(newClip) {
    if (!newClip.url) {
      newClip.url = this.props.firstClip;
    }

    const i = this.state.playing;

    this.setState(state => ({
      clips: [
        ...state.clips.slice(0, i),
        newClip,
        ...state.clips.slice(i + 1)
      ]
    }));

    this.toggleClipEditor();
  }

  deleteClip(i) {
    this.setState({
      clips: [
        ...this.state.clips.slice(0, i),
        ...this.state.clips.slice(i + 1)
      ]
    });

    this.forgetClip(i);

    this.toggleClipEditor();
  }

  // NOTE: clips are stored with the id of their url

  storedClips() {
    try {
      return JSON.parse(localStorage.getItem('clips')) || [];
    } catch (e) {
      return [];
    }
  }

  saveClip(i) {
    let clip = this.state.clips[i];
    let savedClips = this.storedClips();

    let savedIndex = savedClips.findIndex(saved => saved.id === clip.id);

    if(savedIndex > -1) {
      clip = savedClips[savedIndex] = clip;
    } else {
      savedClips.push(clip);
    }
    localStorage.setItem('clips', JSON.stringify(savedClips));
  }

  forgetClip(i) {
    let clip = this.state.clips[i];
     let savedClips = this.storedClips();
    let savedIndex = savedClips.findIndex(saved => saved.id === clip.id);

    if(savedIndex > -1) {
      savedClips.splice(savedIndex, 1);
    }
    localStorage.setItem('clips', JSON.stringify(savedClips));
  }

  // UI for making clips

  toggleClipEditor(e, index = null) {
    this.setState(({ dialog }) => ({
      dialog: !dialog,
      editing: index
    }))
  }

  setClipEditor () {
    const { editing } = this.state;
    if (editing !== null) {
      const editedClip = this.state.clips[editing];
      return (
        <ClipEditor
          {...editedClip}
          onUpdate={this.editClip}
          onExit={this.toggleClipEditor} />
      );
    }
    return (
      <ClipEditor
        onUpdate={this.addClip}
        onExit={this.toggleClipEditor} />
    );
  }

  render() {
    let { playing } = this.state;
    const clip = this.state.clips[playing];

    const map = {
      moveLeft: 'left',
      moveRight: 'right'
    }

    const handler = {
      'moveLeft': this.prevVideo,
      'moveRight': this.nextVideo
    }

    return (
      <HotKeys keyMap={map} handlers={handler}>
        <section className="container">
          <div className="row">
            <main className="column column-50">
              {this.state.dialog ?
                this.setClipEditor() :
                <Player
                  {...clip}
                  onNext={this.nextVideo}
                  loader={playing > 0} />
              }
            </main>
            <aside className="column column-50">
              <div className="container">
                <header className="row">
                  <div className="column column-50">
                    <h3>All Clips</h3>
                  </div>
                  <div className="column column-offset-25">
                    <button
                    className="button button-outline"
                    onClick={this.toggleClipEditor}>
                      Add Clip
                    </button>
                  </div>
                </header>
                <ClipList
                  clips={this.state.clips}
                  current={playing}
                  onClick={this.updatePlayer}
                  onSave={this.saveClip}
                  onEdit={(i) => this.toggleClipEditor(null, i)}
                  onDelete={this.deleteClip} />
              </div>
            </aside>
          </div>
        </section>
      </HotKeys>
    );
  }
}

export default Clipper;
