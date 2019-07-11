import React from 'react';
import AppHeader from './header';
import AppNav from './nav';
import style from './style.module.scss';

import UserManage from '@/views/userManage/user';
import PublicFactor from '@/views/researchManage/publicFactor';
import NotFound from '@/views/notFound';
import RouteGuard from '@/components/RouteGuard';

import {
    Switch,
    Redirect,
    Route
} from 'react-router-dom';

const authRoute = [
    {
        path: '/userManage',
        exact: true,
        component: UserManage,
    },
    {
        path: '/publicFactor',
        exact: true,
        component: PublicFactor,
    }
];
class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className={style.container}>
                <AppHeader></AppHeader>
                <div className={style.body}>
                    <AppNav></AppNav>
                    <div className={style.content}>
                        <Switch>                     
                            <Redirect from="/" to="/userManage" exact></Redirect> 
                            {
                                authRoute.map(item => (
                                    <RouteGuard path={item.path} exact={item.exact} component={item.component} key={item.path}></RouteGuard>
                                ))
                            }
                            <Route component={NotFound}></Route>                                                                                               
                        </Switch>  
                    </div>
                </div>
            </div>
        );
    }
}

export default AppLayout;
