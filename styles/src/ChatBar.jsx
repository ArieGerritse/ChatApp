import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.key === "Enter") {
      this.props.newMessage(
        document.getElementById("username").value,
        document.getElementById("newContent").value
      );
      document.getElementById("newContent").value = "";
    }
  }

  sendNotification(newUsername, oldUsername) {
    let newNotification = {
      type: "postNotification",
      username: newUsername,
      oldUsername: oldUsername
    };
    this.state.connect.server.send(JSON.stringify(newNotification));
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          id="username"
          className="chatbar-username"
          placeholder={this.props.currentUser}
          type="text"
        />
        <input
          id="newContent"
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          type="text"
          onKeyUp={this.handleChange}
        />
      </footer>
    );
  }
}

export default ChatBar;
