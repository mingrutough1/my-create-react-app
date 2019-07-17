import React from 'react';
import { Table ,Switch} from 'antd';

const columns = [
    {
        title: '序号',
        dataIndex: 'order',
        key: 'order',
        width: 80
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 200

    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      width: 200

    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 300
    },
    {
        title: '用户角色',
        key: 'userRoles',
        render: (data) => {
          return (<div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>{data && data.userRoles.map(item => item.label).join('，')}</div>)
        }
      },
    {
      title: '操作',
      key: 'action',
      render: (data) => {
        return (<Switch defaultChecked={data.isValid} onChange={handleSwich(data.userId)}></Switch>)
      }
    },
  ];

function handleSwich (userId) {
  return () => {
    $axios.post('/user/delete.json', {
      userId
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
