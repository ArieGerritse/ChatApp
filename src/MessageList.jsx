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
        {this.props.name.map((eachMessage) => {
           return <Message name={eachMessage}/>
        })
      }
        </main>
      </div>
    );
  }
}

export default MessageList;