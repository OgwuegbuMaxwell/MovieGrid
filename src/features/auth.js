/* 

Purpose

This code manages the user authentication state in the application 
using Redux Toolkit.

 * 
 */

import { createSlice } from "@reduxjs/toolkit";

// Initial state for the authentication slice
const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: '',
};

const authSlice = createSlice({
    name: 'user',  // Unique name for this slice
    initialState, // Initial state of this slice

    // Reducers define how to update the state
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem('session_id');
            
            localStorage.setItem('accountId', action.payload.id);
            

        
            console.log(action.payload);
        }
    }

});

// Exporting the `setUser` action for use in components to update the state
export const { setUser } = authSlice.actions;
// Exporting the reducer to be added to the Redux store
export default authSlice.reducer;
// A selector function to access the user state from the Redux store
export const userSelector = (state) => state.user;




/**
 * 
 * 
    How to Add the Reducer to the Store 
    Integrate the authSlice reducer into your Redux store:

   
    import { configureStore } from '@reduxjs/toolkit';
    import authReducer from './features/auth';

    const store = configureStore({
        reducer: {
            user: authReducer, // Add the auth slice to the store
        },
    });

    export default store;



 * 
 */





/**
 * 
    Dispatching the setUser Action

    When a user logs in, dispatch the setUser action to update the state:

    import { useDispatch } from 'react-redux';
    import { setUser } from './features/auth';

    const logInUser = (userData) => {
        const dispatch = useDispatch();

        // Dispatch the action with the user data
        dispatch(setUser(userData));
    };

 * 
 */


/**
 * 
 
    Accessing the User State
    
    Use the userSelector to access the user state in a component:

    import { useSelector } from 'react-redux';
    import { userSelector } from './features/auth';

    const UserProfile = () => {
        const { user, isAuthenticated } = useSelector(userSelector);

        if (!isAuthenticated) return <div>Please log in.</div>;

        return (
            <div>
                <h1>Welcome, {user.username}!</h1>
            </div>
        );
    };

 * 
 */