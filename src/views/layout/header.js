import React from 'react';
import style from './style.module.scss';
import { Icon } from 'antd';
import { withRouter } from 'react-router-dom';
@withRouter
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    logout = () => {
        $axios.get('/logout.json').then((res) => {
            if (res.data.code === '0') {
                this.props.history.push('/login');
            }
        });
    }
    render() {
        return (
            <div className={style.header}>
                <span className={style.title}>智能委外平台后台管理</span>
                <div className={style.userInfo}>
                    <Icon type="user" style={{color: '#fff', margin: '0 4px'}}/>用户名
                    <span onClick={this.logout}><Icon type="logout" style={{color: '#fff', margin: '0 4px 0 18px'}}/>退出</span>
                </div>
            </div>
        );
    }
}

export default Header;
