import React, {useEffect} from 'react';
import Style from './UserData.module.css';
import Error from '../Error';
import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getUserById, putUser, getUsers} from '../../../Actions/index.js';
import axios from 'axios';
import {useHistory} from 'react-router-dom';



function UserData(){
    
    const userDB = useSelector((state) => state.userReducer.userId);
    const allUsers = useSelector((state) => state.userReducer.allUsers);
    //const isActive = allUsers.filter(user => user.id === userDB.id);
    const dispatch = useDispatch();
    const {user} = useAuth0();
    const {sub, email} = user;
    let id = sub.split("|")[1];
    const history = useHistory();
    
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getUserById(id));
    }, []);
    
    const isActive = allUsers.find(user =>{
        console.log("find",user.id);
        return user.id === userDB.id});
    console.log("all", allUsers[0]);
    console.log("user", userDB);
    console.log("userId", userDB.id);
    console.log("isActive",isActive);
    
    
    

    function changePass(){
        // var options = {
        //     method: 'POST',
        //     url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/dbconnections/change_password`,
        //     headers: {'content-type': 'application/json'},
        //     data: {
        //         client_id: `${process.env.CLIENT_ID}`,
        //         email: email,
        //         connection: 'Username-Password-Authentication'
        //     }
        //     };
        
        //     axios.request(options).then(function (response) {
        //     console.log(response.data);
        //     }).catch(function (error) {
        //     console.error(error);
        //     });
    }
    
    function deleteAccount(){
   
        dispatch(putUser(userDB.id)); 
        alert("You have succesfully deleted your account");
        history.push('/userDash');

    }
     return(
        isActive.status !== "deleted" ?
        <div className={Style.container}>   
            <h3 className={Style.title}>Personal Info</h3>
            <ul className={Style.ul}>
                <li>FullName: {userDB.name}  </li>
                <li>E-mail : {userDB.email}</li>
                <li>Id : {id}</li>
            </ul>
            <div className={Style.boxBtn}>
                <button className={Style.btn} onClick={changePass}>CHANGE YOUR PASSWORD</button>
                <button className={Style.btn} onClick={deleteAccount}>DELETE YOUR ACCOUNT</button>
                <NavLink to='/userEdit'>
                    <button className={Style.btn}>EDIT INFO</button>
                </NavLink>
            </div>
                <NavLink to='/userDash'>
                    <button className={Style.btn}>CONTROL PANEL</button>
                </NavLink>
        </div>
        :<Error />
    )

}

export default UserData;