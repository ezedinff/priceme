import React, { useState, useReducer } from 'react';

let user = localStorage.getItem('currentUser')
    ? JSON.parse(<string>localStorage.getItem('currentUser')).username
    : '';
let token = localStorage.getItem('currentUser')
    ? JSON.parse(<string>localStorage.getItem('currentUser')).accessToken
    : '';
interface AuthState {
    user: string;
    token: string;
    loading: false;
    errorMessage: string | null;
}
export const initialState: AuthState = {
    user: '' || user,
    token: '' || token,
    loading: false,
    errorMessage: null,
};

export const AuthReducer = (initialState: AuthState , action: any) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                ...initialState,
                loading: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...initialState,
                user: action.payload.username,
                token: action.payload.accessToken,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...initialState,
                user: '',
                token: '',
            };

        case 'LOGIN_ERROR':
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
