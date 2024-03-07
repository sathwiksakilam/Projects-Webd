import React, { useEffect, useState } from 'react';
import { Input, Segment, Button } from 'semantic-ui-react';
import firebase from '../../../server/firebase';
import { connect } from 'react-redux';
import ImageUpload from '../ImageUpload/ImageUpload';
import { contentType } from 'mime-types';
import { uuid } from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';
// import { storageRef } from '../../../server/firebase'; // Import Firebase Storage

const MessageInput = (props) => {
  const messageRef = firebase.database().ref('messages');
  const [messageState, setMessageState] = useState('');
  const [fileDialogState,setfileDialogState] = useState(false);

  // Correct usage of Firebase Storage reference
  var storageRef = firebase.storage().ref();

  const createMessageInfo = (downloadUrl) => {
    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: messageState,
      image:downloadUrl || " ",
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
  };

  const sendMessage = (downloadUrl) => {
    if (messageState || downloadUrl) {
      messageRef.child(props.channel.id)
        .push()
        .set(createMessageInfo(downloadUrl))
        .then(() => setMessageState(""))
        .catch((err) => console.log(err));
    }
  };

  const onMessageChange = (e) => {
    setMessageState(e.target.value);
  };

  const createActionButtons = () => (
    <>
      <Button icon="send" onClick={()=>{sendMessage()}}/>
      <Button icon="upload" onClick={()=>setfileDialogState(true)}/>
    </>
  );

  const uploadImage = (file,contentType) =>{
    const filePath = `chat/images/${uuidv4()}.jpg`
    storageRef.child(filePath).put(file,{contentType:contentType})
    .then((data)=>{
      data.ref.getDownloadURL()
      .then((url)=>{
       sendMessage(url);
      })
    })
    .catch((err)=> console.log(err));
  }

  return (
    <Segment>
      <Input
        onChange={onMessageChange}
        fluid={true}
        name="message"
        value={messageState}
        label={createActionButtons()}
        labelPosition="right"
      />
      <ImageUpload onClose={()=>setfileDialogState(false)} open={fileDialogState} uploadImage={uploadImage}/>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
      user: state.user.currentUser,
      channel: state.channel.currentChannel
  }
}

export default connect(mapStateToProps)(MessageInput);
