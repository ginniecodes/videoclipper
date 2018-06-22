import React, { Component } from 'react';

class ClipEditor extends Component {
  constructor(props) {
    super(props);

    this.updateName = this.updateName.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.sendClip = this.sendClip.bind(this);

    const { url, name, start, end } = this.props

    this.state = {
      url,
      name,
      start,
      end
    }
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    });
  }

  updateTime(e, n) {
    const newState = {};
    console.log(e.target.value);
    newState[n] = parseInt(e.target.value);
    this.setState(newState);
  }

  sendClip (e) {
    e.preventDefault();

    this.props.onUpdate({
      name: this.state.name,
      start: this.state.start,
      end: this.state.end,
      id: this.props.id
    });
  }

  render () {
    const { name, start, end } = this.state;

    return (
      <div>
      <button onClick={this.props.onExit}>&times;</button>
        <form onSubmit={this.sendClip}>
          <header>Add Clip</header>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={this.updateName} />
          <label htmlFor="timestart">Start Time (sec)</label>
          <input id="timestart"
            type="number"
            value={start}
            min={0}
            onChange={(e) => this.updateTime(e, 'start')}
            />
          <label htmlFor="timestop">Stop Time (sec)</label>
          <input id="timestop"
            type="number"
            value={end}
            min={start}
            onChange={(e) => this.updateTime(e, 'end')}
            />
          <button>Add</button>
        </form>
      </div>
    )
  }
}

// TODO: add proptypes

export default ClipEditor;
