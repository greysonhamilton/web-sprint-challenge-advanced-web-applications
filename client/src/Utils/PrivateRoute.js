import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route 
        {...rest}
        render={(componentProps) => {
            if (localStorage.getItem('token')) {
                return <Component {...componentProps} />
            } else {
                return <Redirect to='/' />
            }
        }} />
    )
}