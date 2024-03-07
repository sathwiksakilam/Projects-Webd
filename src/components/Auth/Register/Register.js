import React, { useState } from 'react'
import { Grid, Form, Segment, Icon, Header, Button, Message } from 'semantic-ui-react';
import '../Auth.css'
import firebase from '../../../server/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../server/firebase'
// import database from '../../../server/firebase';
import "firebase/compat/database";
import { Link } from 'react-router-dom'





const Register = () => {
    let user = {
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
    }

    let errors = []
    const userCollectionRef = firebase.database().ref('users');
    

    const [userState, setUserState] = useState(user);
    const [errorState, setErrorState] = useState(errors);
    const [isloading,setIsLoading] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);

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
        else if (!checkPassword()) {
            return false;
        }
        return true;
    }

    const isFormEmpty = () => {
        return !userState.username.length || !userState.email.length || !userState.password.length || !userState.confirmpassword.length;
    }

    const checkPassword = () => {
        if (userState.password.length < 8) {
            setErrorState((error) => error.concat({ message: "Password length should be greater than 8" }));
            return false;
        }
        else if (userState.password !== userState.confirmpassword) {
            setErrorState((error) => error.concat({ message: "Password and confirm password does not match" }));
            return false;
        }
        return true;
    }
    const onsubmit = (event) => {
        setErrorState(() => [])
        setIsSuccess(false);
        if (checkForm()) {
            // const auth = getAuth();
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, userState.email, userState.password)
                .then((createdUser) => {
                    // Signed up 
                    setIsLoading(false);
                    updateUserDetails(createdUser);
                    // console.log(createdUser)
                    // ...
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
                saveUserInDB(createduser);
            })
            .catch((serverError) => {
                setIsLoading(false);
                setErrorState((prevError) => prevError.concat(serverError));
            });
        }
    };
    

    const saveUserInDB = (createdUser) =>{
        setIsLoading(true);
        userCollectionRef.child(createdUser.user.uid).set({
            displayName:createdUser.user.displayName,
            photoURL : createdUser.user.photoURL
        })
        .then(()=>{
            setIsLoading(false);
            setIsSuccess(true);
        })
        .catch(servererror=>{
            setIsLoading(false);
            setErrorState((error)=> error.concat(servererror));
        })
    }
    
    

    const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }



    return (
        <Grid verticalAlign="center" textAlign="center" className="grid-form">
            <Grid.Column style={{ maxWidth: "500px" }}>
                <Header icon as="h2">
                    <Icon name="slack" />
                    Register
                </Header>
                <Form onSubmit={onsubmit} >
                    <Segment stacked>
                        <Form.Input name="username" value={userState.username} icon="user" iconPosition='left' onChange={handleInput} type="text" placeholder="User Name" />
                        <Form.Input name="email" value={userState.email} icon="mail" iconPosition='left' onChange={handleInput} type="email" placeholder="User Email" />
                        <Form.Input name="password" value={userState.password} icon="lock" iconPosition='left' onChange={handleInput} type="password" placeholder="User Password" />
                        <Form.Input name="confirmpassword" value={userState.confirmpassword} icon="lock" iconPosition='left' onChange={handleInput} type="password" placeholder="Confirm Password" />
                    </Segment>
                    <Button disabled={isloading} loading={isloading}>Register</Button>
                </Form>
                {errorState.length > 0 && <Message error>
                    <h3>Errors</h3>
                    {formaterrors()}
                </Message>}
                 {isSuccess && <Message success>
                    <h3>Successfully Registered</h3>
                </Message>}
                <Message>
                    Already an user? <Link to="/login">Login</Link>
                </Message>
                
            </Grid.Column>
        </Grid>
    )
}

export default Register
