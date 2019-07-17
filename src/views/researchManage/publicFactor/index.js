import React from 'react';
import style from './style.module.scss';

import FilterForms from './FilterForms';
import ActionButtons from './ActionButtons';
import Lists from './Lists';


class PublicFactor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userListData: [],
            loading: false,
        };
    }
    componentWillMount() {
        this.getUsers();
    }
    getUsers = (param) => {
        const params = {
            ...param
        };
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
        return (
            <div className={style.container}>
                <FilterForms getUsers={this.getUsers}></FilterForms>
                <ActionButtons></ActionButtons>
                <Lists userListData={this.state.userListData} loading={this.state.loading}></Lists>
            </div>
        );
    }
}

export default PublicFactor;
