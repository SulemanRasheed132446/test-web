
import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { NonAuthRoutes } from './Roles';

interface Props {
    Component: any;
    path: string;
    exact?: boolean;
    LayoutComponent?: any;
    requiredRoles: string[];

}
const AuthRoute = ({ Component, path, exact = false, LayoutComponent, requiredRoles }: Props) => {
    const isAuthed = !!localStorage.getItem('token');
    const userRole: string = String(localStorage.getItem('usertype'));
    const userHasRequiredRole = requiredRoles.includes(userRole);
    const message = userHasRequiredRole ? 'Please log in to view this page' : "You can't be here!";
    return (
        <Route
            exact={exact}
            path={path}
            render={(props: any) =>
              isAuthed && userHasRequiredRole ? (
                    LayoutComponent ? (
                        <LayoutComponent {...props}>
                            <Component {...props} />
                        </LayoutComponent>
                    ) :
                        (
                            <Component {...props} />
                        )

                ) : (
                        <Redirect
                            to={{
                                pathname: userHasRequiredRole ?
                                    NonAuthRoutes.login :
                                    NonAuthRoutes.unautheration,
                                state: {
                                    message,
                                    requestedPath: path
                                }
                            }}
                        />
                    )
            }
        />
    );
};

export default AuthRoute;