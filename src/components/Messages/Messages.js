import React, { useEffect, useState } from 'react'
import Message_Header from './Message_Header/Message_Header'
import MessageInput from './Message_Input/MessageInput'
import MessageContent from './MessageContent/MessageContent'
import firebase from '../../server/firebase'
import { connect } from 'react-redux'
import { Segment, Comment } from 'semantic-ui-react'
import './Messages.css'


const Messages = (props) => {
  const messageRef = firebase.database().ref('messages');
  const [messagesState, setMessageState] = useState([]);
  const [searchTermState,setsearchTermState] = useState("");

  useEffect(() => {
    if (props.channel) {
      setMessageState([])
      messageRef.child(props.channel.id).on('child_added', (snap) => {
        setMessageState((currenState) => {
          let updatedState = [...currenState];
          updatedState.push(snap.val());
          return updatedState;
        })
      })
      return () => messageRef.child(props.channel.id).off();
    }
  }, [props.channel])

  const displayMessages = () => {
    // let messageToDisplay = searchTermState ? filterMessageBySearchTerm() : messagesState;
    if (messagesState.length > 0) {
      return messagesState.map((message) => {
        return <MessageContent ownMessage={message.user.id===props.user.uid}key={message.timestamp} message={message} />
      })
    }
  }

  const uniqueUsersCount = () =>{
    const uniqueUsers = messagesState.reduce((acc,message)=>{
      if(!acc.includes(message.user.name)){
        acc.push(message.user.name);
      }
      return acc;
    },[]);
    return uniqueUsers.length;
  }

  // const searchTermChange = (e) =>{
  //   const target = e.target;
  //   setsearchTermState(target.value);
  // }

  // const filterMessageBySearchTerm = () =>{
  //   const regex = new RegExp(searchTermState,"gi");
  //   const messages = messagesState.reduce((acc,message)=>{
  //     if((message.content && message.content.match(regex) || message.user.name.match(regex))){
  //       acc.push(message);
  //     }
  //     return acc;
  //   },[]);
  //   return messages;
  // }

  // Add searchTermChange={searchTermChange}
  return <>
    <div className='messages'>
      <Message_Header  isPrivateChat={props.channel?.isPrivateChat} channelName={props.channel?.name} uniqueUsers={uniqueUsersCount} />
      <Segment className='messagecontent'>
        <Comment.Group>
          {displayMessages()}
        </Comment.Group>
      </Segment>
      <MessageInput />
    </div>
  </>
}
const mapStateToProps = (state) => {
  return {
    channel: state.channel.currentChannel,
    user :state.user.currentUser
  }
}

export default connect(mapStateToProps)(Messages);
