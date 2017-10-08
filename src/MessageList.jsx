import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messages = this.props.allMessages.messages.map(messages => {
      switch (messages.type) {
        case 'incomingMessage':
          return (
            <Message
              key={messages.id}
              username={messages.username}
              content={messages.content}
              color={{ color: messages.color }}
            />
          );
        case 'incomingNotification':
          return (
            <Message
              key={messages.id}
              content={`${messages.oldUsername} has changed thier name to ${messages.username}`}
            />
          );
      }
    });

    return <div className="messages">{messages}</div>;
  }
}

export default MessageList;
