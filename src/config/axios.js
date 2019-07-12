import axios from 'axios';
import { message } from 'antd';
// import { history } from 'react-router-dom'
const status = [
    { code: '1', msg: '发生未知错误' },
    { code: '2', msg: '非法请求' },
    { code: '3', msg: '非法参数' },
    { code: '4', msg: '缺少必要参数' },
    { code: '5', msg: '参数错误' },
    { code: '6', msg: '请求方式不被支持' },
    { code: '7', msg: '您没有权限进行此操作' },
    { code: '8', msg: '您访问的资源不存在' },
    { code: '9', msg: '缺少登录名' },
    { code: '10', msg: '缺少密码' },
    { code: '11', msg: '缺少验证码' },
    { code: '12', msg: '账号不存在' },
    { code: '13', msg: '密码错误' },
    { code: '14', msg: '验证码错误' },
    { code: '15', msg: '帐号已被锁定' },
    { code: '16', msg: '帐号已存在' },
    { code: '17', msg: '非法三方应用' },
    { code: '18', msg: '非法授权请求' },
    { code: '19', msg: '非法更新访问码请求' },
    { code: '20', msg: '您的令牌已过期' },
    { code: '21', msg: '您需要登录后再访问' },
    { code: 'CAS01', msg: '' },
    { code: 'CAS02', msg: 'CAS服务器返回结果为空' },
    { code: 'CAS03', msg: 'CAS服务器调用成功但返回结果为空' },
    { code: 'CAS04', msg: 'CAS服务器调用失败但返回结果为空' }
  ];
const instance = axios.create({
    baseURL: '/kyfadm-api',
    withCredentials: true,
  });
instance.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.transformRequest = [(data) => {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      return formData;
    }];
  }
  return config;
});
instance.interceptors.response.use(function (res) {
    // Do something with response data
    if (res.status !== 200) message.warning(`系统错误，错误代码${res.status}`);
    const result = res.data;
    const { code } = result;
    if (code === '0') {
        return res;
    }
    if (!code && code !== '0' && result.status !== 0) {
        message.warning('请检查接口api是否正确');
        return {
          data: {
            code: 'err',
            data: []
          }
        };
    }
    message.warning(status.find(item => item.code === code).msg || result.msg);
    if (code === '21') window.location.href = 'login';
    return res;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
export default instance;