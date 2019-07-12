import React from 'react';
import { Route, withRouter} from 'react-router-dom';
@withRouter
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
        $axios.get('/login.json').then((res)=>{
            if (res.data.code === '0') {
                this.setState({
                    requested: true,
                    hasAuth: true,
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
