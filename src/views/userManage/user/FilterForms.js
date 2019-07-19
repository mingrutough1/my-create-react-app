import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import style from './style.module.scss';
import {inject, observer} from "mobx-react";

const { Option ,OptGroup} = Select;
@inject(stores => ({
    rolesOptions: stores.store.rolesOptions,
    setRolesOptions: stores.store.setRolesOptions
}))
@observer
class FilterForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        this.getRoles();
    }
    getUsers = () => {
        this.props.getUsers();
    }
    getRoles = () => {
        $axios.get('/user/roles.json').then((res) => {
            if (res.data.code === '0') {
                this.props.setRolesOptions({
                    rolesOptions: res.data.data
                });
            }
        });
    }
    handleInputChange = type => (e) => {
        this.props.setFormState(type, e.target.value);
    }
    handleSelectChange = type => (value) => {
        this.props.setFormState(type, value);
    }
    render() {
        const {userId, userName, valid, role, rolesOptions} = this.props;
        return (
            <div className={style.formCon}>
                <Form layout="inline">
                    <Form.Item label="用户ID：">
                        <Input value={userId} onChange={this.handleInputChange('userId')} allowClear/>
                    </Form.Item>
                    <Form.Item label="用户名称：">
                        <Input value={userName} onChange={this.handleInputChange('userName')} allowClear/>
                    </Form.Item>
                    <Form.Item label="用户角色：">
                        <Select mode="multiple" style={{ width: 220 }} onChange={this.handleSelectChange('role')} value={role}>
                            {
                                Object.keys(rolesOptions).map(item => (
                                    <OptGroup label={item} key={item}>
                                    {
                                        Object.keys(rolesOptions[item]).map(child => (
                                            rolesOptions[item][child]? <Option value={rolesOptions[item][child]} key={child}>{rolesOptions[item][child]}</Option> : null
                                        ))
                                    }
                                    </OptGroup> 
                                ))
                            }                      
                        </Select>
                    </Form.Item>
                    <Form.Item label="是否有效：">
                        <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleSelectChange('valid')}  value={valid}>
                            <Option value="all">全部</Option>
                            <Option value="true">是</Option>
                            <Option value="">否</Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" className={style.rightBtn} onClick={this.getUsers}>确定</Button>
                </Form>
            </div>
        );
    }
}

export default FilterForms;