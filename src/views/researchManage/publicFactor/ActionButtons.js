import React from 'react';
import { Button , Upload, message, Popconfirm} from 'antd';
import style from './style.module.scss';

class ActionButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadText: '导入',
            src: '',
        };
    }
    onUpLoadChange = (info) => {
        this.setState({
            uploadText: '导入中...'
        });
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            this.setState({
                uploadText: '导入'
            });
            this.props.resetFormAndGet();
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
            this.setState({
                uploadText: '导入'
            });
        }
    }
    deleteAll = () => {
        $axios.post('/factor/delete.json', {
            all: true
        }).then((res) => {
            if (res.data.code === '0') {
                message.success(`全部删除成功`);
            }
        });
    }
    export = () => {
        $util.iframeDownload("/kyfadm-api/factor/export.json");
    }
    render() {
        return (
            <div className={style.actionCon}>
                <Upload 
                showUploadList={false}
                name = 'file'
                action="/kyfadm-api/factor/import.json"
                onChange={this.onUpLoadChange}
                >
                    <Button type="primary" >{this.state.uploadText}</Button>
                </Upload>
                <Button type="primary" style={{marginLeft: '10px'}} onClick={this.export}>导出</Button>
                <Popconfirm
                    title="确定要删除全部?"
                    onConfirm={this.deleteAll}
                    okText="删除"
                    cancelText="取消"
                >
                    <Button type="primary" style={{marginLeft: '10px'}}>全部删除</Button>
                </Popconfirm>        
            </div>
        );
    }
}

export default ActionButtons;
