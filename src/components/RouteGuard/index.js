import React from 'react';
import { Route, withRouter} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@withRouter
@inject(stores => ({
    setUserInfo: stores.store.UseInfo.setUserInfo
}))
@observer
class RouterGuard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: false,
            hasAuth: false,
        };
    }
    componentDidMount() {
        const env = process.env.NODE_ENV;
        if (env === "development") {
            this.setState({
                requested: true,
                hasAuth: true,
            });
            return;
        }
        $axios.get('/login.json').then((res)=>{
            if (res.data.code === '0') {
                this.setState({
                    requested: true,
                    hasAuth: true,
                });
                this.props.setUserInfo({
                    userInfo: res.data.data
                });
            } else {
                this.props.history.push('/login');
            }
        });
    }
    render() {
        const {...rest} = this.props;
        if (!this.state.requested) return null;
        return <Route {...rest}></Route>
    }
}

export default RouterGuard;
