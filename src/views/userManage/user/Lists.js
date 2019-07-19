import React from 'react';
import { Table ,Switch} from 'antd';

const wordBreak = { wordWrap: 'break-word', wordBreak: 'break-all' }
const columns = [
    {
        title: '序号',
        dataIndex: 'order',
        key: 'order',
        width: 100,
    },
    {
      title: '用户ID',
      key: 'userKey',
      width: 200,
      render: (data) => {
        return (<div style={wordBreak}>{data.userKey}</div>)
      }
    },
    {
      title: '用户名称',
      key: 'userName',
      width: 200,
      render: (data) => {
        return (<div style={wordBreak}>{data.userName}</div>)
      }
    },
    {
      title: '用户邮箱',
      key: 'email',
      width: 300,
      render: (data) => {
        return (<div style={wordBreak}>{data.email}</div>)
      }
    },
    {
        title: '用户角色',
        key: 'userRoles',
        render: (data) => {
          return (<div style={wordBreak}>{data && data.userRoles.map(item => item.label).join('，')}</div>)
        }
      },
    {
      title: '有效性',
      width: 100,
      key: 'action',
      render: (data) => {
        return (<Switch defaultChecked={data.isValid} onChange={handleSwich(data)}></Switch>)
      }
    },
  ];

function handleSwich (data) {
  return () => {
    $axios.post('/user/changeValid.json', {
      userId: data.userKey,
      isValid: !data.isValid
    }).then((res) => {
      if (res.data.code === '0') {
      }
    });
  }
}
class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
          <Table 
          scroll={{y: 'calc(100vh - 320px)'}}
          bordered 
          loading = {this.props.loading}
          columns={columns} 
          dataSource={this.props.userListData} 
          pagination={false}/>
        );
    }
}

export default Lists;
