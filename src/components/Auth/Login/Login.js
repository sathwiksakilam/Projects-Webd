import React, { useState } from 'react'
import { Grid, Form, Segment, Icon, Header, Button, Message } from 'semantic-ui-react';
// import './Register.css'
import firebase from '../../../server/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../server/firebase'
// import database from '../../../server/firebase';
import "firebase/compat/database";
import { Link } from 'react-router-dom'
import '../Auth.css'





const Login = () => {
    let user = {
        email: '',
        password: '',
    }

    let errors = []
    const userCollectionRef = firebase.database().ref('users');
    

    const [userState, setUserState] = useState(user);
    const [errorState, setErrorState] = useState(errors);
    const [isloading,setIsLoading] = useState(false);
    // const [isSuccess,setIsSuccess] = useState(false);

    const handleInput = (e) => {
        let target = e.target;
        setUserState((currentState) => {
            let currentuser = { ...currentState };
            currentuser[target.name] = target.value;
            return currentuser;
        })
    }

    const checkForm = () => {
        if (isFormEmpty()) {
            setErrorState((error) => error.concat({ message: "Please Enter all the fields" }))
            return false;
        }
        return true;
    }

    const isFormEmpty = () => {
        return !userState.email.length || !userState.password.length;
    }
    const onsubmit = (event) => {
        setErrorState(() => [])
        // setIsSuccess(false);
        if (checkForm()) { 
            setIsLoading(true);
            firebase.auth()
                .signInWithEmailAndPassword(userState.email,userState.password)
                .then((user) => {
                    setIsLoading(false);
                    updateUserDetails(user);
                    // console.log(user)
                })
                .catch((servererror) => {
                    setIsLoading(false);
                    setErrorState((error) => error.concat(servererror));
                });
        }
    }

    const updateUserDetails = (createduser) => {
        if (createduser) {
            setIsLoading(true);
            createduser.user.updateProfile({
                displayName: userState.userName,
                photoURL: `http://gravatar.com/avatar/${createduser.user.uid}?d=identification`
            })
            .then(() => {
                setIsLoading(false);
                console.log(createduser);
                // saveUserInDB(createduser);
            })
            .catch((serverError) => {
                setIsLoading(false);
                setErrorState((prevError) => prevError.concat(serverError));
            });
        }
    };

    // const saveUserInDB = (createdUser) =>{
    //     setIsLoading(true);
    //     userCollectionRef.child(createdUser.user.uid).set({
    //         displayName:createdUser.user.displayName,
    //         photoURL : createdUser.user.photoURL
    //     })
    //     .then(()=>{
    //         setIsLoading(false);
    //         setIsSuccess(true);
    //     })
    //     .catch(servererror=>{
    //         setIsLoading(false);
    //         setErrorState((error)=> error.concat(servererror));
    //     })
    // }
    
    

    const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }



    return (
        <Grid verticalAlign="center" textAlign="center" className="grid-form">
            <Grid.Column style={{ maxWidth: "500px" }}>
                <Header icon as="h2">
                    <Icon name="slack" />
                    Login
                </Header>
                <Form onSubmit={onsubmit} >
                    <Segment stacked>
                        <Form.Input name="email" value={userState.email} icon="mail" iconPosition='left' onChange={handleInput} type="email" placeholder="User Email" />
                        <Form.Input name="password" value={userState.password} icon="lock" iconPosition='left' onChange={handleInput} type="password" placeholder="User Password" />
                    </Segment>
                    <Button disabled={isloading} loading={isloading}>Login</Button>
                </Form>
                {errorState.length > 0 && <Message error>
                    <h3>Errors</h3>
                    {formaterrors()}
                </Message>}
                <Message>
                    New user? <Link to="/register">Register</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
