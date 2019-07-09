import React from 'react';
import AppHeader from './header';
import AppNav from './nav';
import style from './style.module.scss';

import UserManage from '@/views/userManage/user';
import PublicFactor from '@/views/researchManage/publicFactor';
import NotFound from '@/views/notFound';
import {
    Route,
    Switch,
} from 'react-router-dom';

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
                            <Route path="/userManage" exact component={UserManage}></Route>     
                            <Route path="/publicFactor" exact component={PublicFactor}></Route>  
                            <Route component={NotFound}></Route>                                                                                               
                        </Switch>  
                    </div>
                </div>
            </div>
        );
    }
}

export default AppLayout;
