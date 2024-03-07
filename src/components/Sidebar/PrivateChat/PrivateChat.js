import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon } from 'semantic-ui-react'
import firebase from '../../../server/firebase'
import { setChannel } from '../../../store/actioncreator'

const PrivateChat = (props) => {
    const [usersState, setUsersState] = useState([]);

    const usersRef = firebase.database().ref("users");

    useEffect(() => {
        usersRef.on('child_added', (snap) => {
            setUsersState((currentState) => {
                let updatedState = [...currentState];
                let user = snap.val();
                user.name = user.displayName;
                user.isPrivateChat = true;
                user.id = snap.key;
                updatedState.push(user);
                return updatedState;
            });
        });
        return () => usersRef.off();
    }, []);

    const displayUsers = () => {
        if (usersState.length > 0) {
            return usersState.filter((user) => user.id !== props.user.uid).map((user) => (
                <Menu.Item key={user.id} name={user.name} onClick={() => selectUser(user)} active={props.channel && generateChannelId(user.id) === props.channel.id}>
                    {"@" + user.name}
                </Menu.Item>
            ));
        }
        return null;
    };

    const selectUser = (user) =>{
        let userTemp = {...user};
        userTemp.id = generateChannelId(user.id);
        props.selectChannel(userTemp);
    }

    const generateChannelId = (userId) =>{
        if(props.user.uid<userId)
        {
            return props.user.uid+userId;
        }
        else{
            return userId+props.user.uid;
        }
    }

    return (
        <Menu.Menu style={{marginTop:'50px'}}>
            <Menu.Item style={{fontSize:'17px'}}>
                <span>
                    <Icon name="mail" />
                    Chat
                </span>
                ({usersState.length})
            </Menu.Item>
            {displayUsers()}
        </Menu.Menu>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    channel: state.channel.currentChannel
});

const mapDispatchToProps = (dispatch) => ({
    selectChannel: (channel) => dispatch(setChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
