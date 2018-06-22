import React, { Component } from 'react';

class ClipList extends Component {
  render() {
    const { clips, current } = this.props;
    return (
      <nav className="container">
        <ol className="clip-list">
         {clips.map((clip, i) => (
          <li
            key={i}
            className={`row${current === i ? ' current' : ''}`}
            onClick={() => this.props.onClick(i)}>
            <div className="column">{clip.name}</div>
            {(i > 0) &&
              <div className="column">
                <button
                  className="button button-clear"
                  onClick={() => this.props.onSave(i)}>Save</button>
                <button
                  className="button button-clear"
                  onClick={() => this.props.onEdit(i)}>Edit</button>
                <button
                  className="button button-clear"
                  onClick={() => this.props.onDelete(i)}>&times;</button>
              </div>
            }
          </li>
        ))}
        </ol>
      </nav>
    );
  }
}

export default ClipList;
