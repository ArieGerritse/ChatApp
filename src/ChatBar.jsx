import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
  <footer className="chatbar">
    <input className="chatbar-username" placeholder={this.props.name} />
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
  </footer>
    );
  }
}

export default ChatBar;