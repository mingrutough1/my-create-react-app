import React from 'react';
import { Modal, Form, Input, Select, message} from 'antd';
import {inject, observer} from "mobx-react";

const { Option ,OptGroup} = Select;

@Form.create({})
@inject(stores => ({
    rolesOptions: stores.store.UseInfo.rolesOptions,
}))
@observer
class NewUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false
        };
    }
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log(values);
              this.addUser(values);
            }
          });
    }
    contructRoles(parmas) {
        const ans = {};
        parmas.roles.forEach(item => {
            item = item.split('$');
            ans[item[0]] = {};
            ans[item[0]][item[1]] = item[2];
        });
        parmas.roles = ans;
    }
    addUser(parmas) {
        this.contructRoles(parmas);
        this.setState({
            confirmLoading: true
        });
        $axios.post('/user/add.json', parmas).then((res) =>{
            if (res.data.code === '0') {
                this.props.toggleVisible(false);
                message.success('新增成功');
                this.props.resetFormAndGet();
            }
            this.setState({
                confirmLoading: false
            });
        });
    }
    handleCancel = () => {
        this.props.toggleVisible(false);
    }
    handleUseIdChange = (e) => {
        this.props.form.setFieldsValue({
            email: `${e.target.value}@pingan.com.cn`,
          });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { rolesOptions } = this.props;
        const { confirmLoading } = this.state;
        return (
            <Modal
            title="新建用户"
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            confirmLoading={confirmLoading}
            okText="确认"
            cancelText="取消"
            destroyOnClose
          >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                <Form.Item label="用户ID：">
                {getFieldDecorator('userId', {
                    rules: [{ required: true, message: 'Please input your userId!' }],
                })(<Input onChange={this.handleUseIdChange}/>)}
                </Form.Item>
                <Form.Item label="用户名称：">
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your userName!' }],
                })(<Input />)}
                </Form.Item>
                <Form.Item label="用户邮箱：">
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' },
                            {type: 'email',message: 'The input is not valid E-mail!'}],
                })(<Input />)}
                </Form.Item>
                <Form.Item label="用户角色：">
                {getFieldDecorator('roles', {
                    rules: [{ required: true, message: 'Please select your roles!' }],
                })(
                    <Select mode="multiple" style={{ width: 236 }}>
                    {
                        Object.keys(rolesOptions).map(item => (
                            <OptGroup label={item} key={item}>
                            {
                                Object.keys(rolesOptions[item]).map(child => (
                                    rolesOptions[item][child]? <Option value={`${item}$${child}$${rolesOptions[item][child]}`} key={child}>{rolesOptions[item][child]}</Option> : null
                                ))
                            }
                            </OptGroup> 
                        ))
                    }                      
                    </Select>)}
                </Form.Item>
            </Form>
          </Modal>  
        );
    }
}

export default NewUserModal;