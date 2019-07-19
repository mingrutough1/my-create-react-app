import React from 'react'

import style from './style.module.scss';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import {inject, observer} from "mobx-react";

@withRouter
@inject(stores => ({
  setUserInfo: stores.store.UseInfo.setUserInfo
}))
@observer
class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.vCodeRef = React.createRef();
    this.state = {
      vCodeUrl: '',
      vCodeShow: false,
      requestId: ''
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.login(values);
      }
    });
  }
  login = (userInfo) => {
    const {vCodeShow, requestId} = this.state;
    const params = {
      ...userInfo
    };
    if (vCodeShow) { // 有验证码
      params.requestId = requestId;
      params.validCode = this.vCodeRef.current.state.value;
    }
    $axios.post('/login.json', params).then( (res) => {
      const result = res.data;
      if (result.code === '0') {
        this.props.setUserInfo({
          userInfo: res.data.data
        });
        this.props.history.push('/');
      } else if (result.code === '11') {
        const codeData = JSON.parse(result.data[0]);
        this.setState({
          vCodeShow: true,
          vCodeUrl: codeData.validCodeBase64,
          requestId: codeData.requestId
        });
      }
    });
  }
  refreshVCode = () =>{
    $axios.post('/getValidCode.json').then((res) => {
      if (res.data.code === '0') {
        const Cdata = res.data.data;
        this.setState({
          vCodeUrl: Cdata.validCodeBase64,
          requestId: Cdata.validCodeBase64
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { vCodeUrl, vCodeShow} = this.state;
    return (
        <div className={style.container}>
            <h1>智能委外平台后台管理</h1>
            <Form onSubmit={this.handleSubmit} className={style.login_form}>
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    />,
                )}
                </Form.Item>
                {
                  vCodeShow ? 
                  <Form.Item >
                    <img src={vCodeUrl} alt="验证码" style={{width: 120,height:40}} />
                    <Icon type="sync" onClick={this.refreshVCode}/>
                    <Input style={{width: 160, float:'right'}} ref={this.vCodeRef}/>,
                  </Form.Item> : null
                }
                <Form.Item>
                <Button type="primary" htmlType="submit" className={style.button}>
                    登陆
                </Button>
                </Form.Item>
            </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;