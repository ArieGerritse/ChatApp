import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div>
        <main className="messages">

        {this.props.allMessages.map((eachMessage, id) => {
            return <Message message={eachMessage} key={id}/>
          })
        }
        </main>
      </div>
    );
  }
}

export default MessageList;