import { SET_CHANNEL, SET_USER } from "./actiontypes";


export const setUser = (user) =>{
    return{
        type:SET_USER,
        payload :{
            currentUser:user,
        }
    }
}
export const setChannel = (channel) =>{
    return{
        type:SET_CHANNEL,
        payload :{
            currentChannel:channel,
        }
    }
}