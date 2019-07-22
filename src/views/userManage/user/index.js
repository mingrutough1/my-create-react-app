import React from 'react';
import style from './style.module.scss';

import FilterForms from './FilterForms';
import ActionButtons from './ActionButtons';
import Lists from './Lists';


class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userListData: [],
            userId: '',
            userName: '',
            valid: 'all',
            role: [],
            loading: false,
        };
    }
    resetFormAndGet = () =>{
        this.setState({
            userId: '',
            userName: '',
            valid: 'all',
            role: [],      
        }, ()=> {
            this.getUsers();
        });
    }
    setFormState = (key, value) =>{
        this.setState({ 
            [key]: value    
        });
    }
    componentWillMount() {
        this.getUsers();
    }
    getUsers = () => {
        const {userId, userName, valid, role} = this.state;
        const params = {
            userId,
            userName,
        };
        if (valid !== 'all') {
            params.isValid = Boolean(valid);
        } else {
            params.isValid = '';
        }
        if (role.length > 0) {
            params.role = role.join(',');
        }
        this.setState({
            loading: true
        });
        $axios.get('/user/query.json', {
            params,
        }).then((res) => {
            if (res.data.code === '0') {
                const data = res.data.data || [];
                data.forEach((item, index) => {
                    item.order = index + 1;
                    item.key = item.userId;
                });
                this.setState({
                    userListData: data,
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    render() {
        const {userId, userName, valid, role } = this.state;
        const form = {
            userId,
            userName,
            valid,
            role,
            setFormState: this.setFormState
        }
        return (
            <div className={style.container}>
                <FilterForms getUsers={this.getUsers} {...form}></FilterForms>
                <ActionButtons resetFormAndGet={this.resetFormAndGet}></ActionButtons>
                <Lists userListData={this.state.userListData} loading={this.state.loading} getUsers={this.getUsers} setFormState={this.setFormState}></Lists>
            </div>
        );
    }
}

export default UserManage;
