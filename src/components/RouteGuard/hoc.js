import React from 'react';

import {inject, observer} from "mobx-react";

export default function AuthHoc (WrappedComponent) {
    @inject(stores => ({
        setUserInfo: stores.store.UseInfo.setUserInfo
    }))
    @observer
     class PP extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                hasAuth: false
            };
        }
        componentDidMount() {
            console.log('guard');
            $axios.get('/login.json').then((res)=>{
                if (res.data.code === '0') {
                    this.setState({
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
            if (!this.state.hasAuth) return null;
            return <WrappedComponent {...this.props}/>
        }
    }

    return PP;
}