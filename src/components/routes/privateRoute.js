import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/authentication/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    
    const authsContext = useContext(authContext);
    const { authenticate, loading, authenticatedUser } = authsContext;
    
    useEffect( () => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);
    
    return  (
        <Route 
            { ...props } 
            render  =   { props => !authenticate && !loading
                ?   
                    (
                        <Redirect 
                            to="/" 
                        />
                    ) 
                :   
                    (
                        <Component 
                            { ...props } 
                        />
                    )   
                        }   
        />
            )
}

export default PrivateRoute;