import React from 'react';
import { Route } from 'react-router-dom';
class RouterGuard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: false,
            hasAuth: false,
        };
    }
    componentWillMount() {
        console.log('routeGuard');

    }
    componentDidMount() {
        $axios.get('/login').then((res)=>{
            console.log(res);
            if (res.data.code === '0') {
                this.setState({
                    requested: true,
                    hasAuth: true,
                });
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
