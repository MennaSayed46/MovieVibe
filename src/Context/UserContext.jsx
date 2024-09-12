import React, { createContext, useEffect, useState } from 'react';

export let UserContext = createContext();

export default function UserContextProvider(props) {
    let [UserData, setUserData] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem('userToken')){
            setUserData(localStorage.getItem('userToken'));
        }
    },[])

    return (
        <UserContext.Provider value={{ UserData, setUserData }}>
            {props.children}
        </UserContext.Provider>
    );
}