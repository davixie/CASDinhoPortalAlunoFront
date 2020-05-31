import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {AdmAuthenticated} from '../Authenticate/adm'
import {StudentAuthenticated} from '../Authenticate/student'

export const PrivateRouteStudent = ({ component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        StudentAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname:'/', state: { from: props.location } }} />
        )
    )} />
)

export const PrivateRouteAdm = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        AdmAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname:'/', state: { from: props.location } }} />
        )
    )}/>
)