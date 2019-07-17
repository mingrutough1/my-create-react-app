import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import style from './style.module.scss';

const { Option ,OptGroup} = Select;
class FilterForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rolesOptions: {},
            userId: '',
            userName: '',
            valid: 'all',
            role: 'all',
        };
    }
    componentWillMount() {
        this.getRoles();
    }
    getUsers = () => {
        const {userId, userName, valid, role} = this.state;
        const param = {
            userId,
            userName,
        };
        if (valid !== 'all') {
            param.valid = Boolean(valid);
        }
        if (role !== 'all') {
            param.role = role;
        }
        this.props.getUsers(param);
    }
    getRoles = () => {
        $axios.get('/user/roles.json').then((res) => {
            if (res.data.code === '0') {
                this.setState({
                    rolesOptions: res.data.data
                });
            }
        });
    }
    handleInputChange = type => (e) => {
        this.setState({
            [type]: e.target.value
        });
    }
    handleSelectChange = type => (value) => {
        this.setState({
            [type]: value
        });
    }
    render() {
        const {userId, userName, rolesOptions} = this.state;
        return (
            <div className={style.formCon}>
                <Form layout="inline">
                    <Form.Item label="因子ID：">
                        <Input value={userId} onChange={this.handleInputChange('userId')} allowClear/>
                    </Form.Item>
                    <Form.Item label="因子code：">
                        <Input value={userId} onChange={this.handleInputChange('userId')} allowClear/>
                    </Form.Item>
                    <Form.Item label="因子名称：">
                        <Input value={userName} onChange={this.handleInputChange('userName')} allowClear/>
                    </Form.Item>
                    <Form.Item label="用户角色：">
                        <Select mode="multiple" style={{ width: 220 }} onChange={this.handleSelectChange('role')}>
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
                        <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleSelectChange('valid')}>
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