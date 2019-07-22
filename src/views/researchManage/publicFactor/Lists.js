import React from 'react';
import { Table } from 'antd';

const wordElipsis = {
  textOverflow: 'ellipsis',
  width: '200px',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
}
const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      fixed: 'left'
    },
    {
      title: '因子ID',
      dataIndex: 'factorId',
      key: 'factorId',
      with: 200
    },
    {
      title: '因子code',
      dataIndex: 'factorCode',
      key: 'factorCode',
    },
    {
      title: '因子名',
      key: 'factorName',
      render: (data) => {
        return (<div style={wordElipsis} title={data.factorName}>{data.factorName}</div>)
      }
    },
    {
      title: '对象类型',
      dataIndex: 'objectType',
      key: 'objectType',
      width: 200

    },
    {
      title: '数据频率',
      dataIndex: 'dataFrequency',
      key: 'dataFrequency',
      width: 200

    },
    {
      title: '是否计算',
      dataIndex: 'isCalculate',
      key: 'isCalculate',
      width: 300
    },    {
      title: '算法优先级',
      dataIndex: 'calculatePriority',
      key: 'calculatePriority',
      width: 200
    },
    {
      title: '算法描述',
      key: 'algorithmDesc',
      render: (data) => {
        return (<div style={wordElipsis} title={data.algorithmDesc}>{data.algorithmDesc}</div>)
      }
    },
    {
      title: '计算窗口',
      dataIndex: 'calculateWindow',
      key: 'calculateWindow',
      width: 200
    },
    {
      title: '窗口偏移',
      dataIndex: 'windowShift',
      key: 'windowShift',
      width: 200

    },
    {
      title: '计算细节',
      key: 'dataProcessDetail',
      render: (data) => {
        return (<div style={wordElipsis} title={data.dataProcessDetail}>{data.dataProcessDetail}</div>)
      }
    },
    {
      title: '操作',
      fixed: 'right',
      key: 'action',
      width: 80,
      render: (data) => <a href="javascript:;" onClick={deleteItem(data.factorId)}>删除</a>},
  ];

function deleteItem (factorId) {
  return () => {
    $axios.post('/factor/delete.json', {
      factorId,
      all: false
    }).then((res) => {
      if (res.data.code === '0') {
        this.props.getUsers();
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
          scroll={{
            x: 2000
          }}
          bordered 
          loading = {this.props.loading}
          columns={columns} 
          dataSource={this.props.factorListData} 
          pagination={
            {
              current: this.props.pno,
              pageSize: this.props.size,
              total: this.props.total,
              onChange: this.props.setCurPageAndFet
            }
          }/>
        );
    }
}

export default Lists;
