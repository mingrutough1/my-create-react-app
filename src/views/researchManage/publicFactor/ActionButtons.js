import React from 'react';
import { Button , Upload, message} from 'antd';
import style from './style.module.scss';

class ActionButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadText: '导入',
            src: '',
            visible: false
        };
    }
    toggleVisible = (visible) => {
        this.setState({
            visible,
        });
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
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
            this.setState({
                uploadText: '导入'
            });
        }
    }
    export = () => {
        $util.iframeDownload("/kyfadm-api/user/export.json");
    }
    render() {
        return (
            <div className={style.actionCon}>
                <Upload 
                showUploadList={false}
                name = 'file'
                action="/kyfadm-api/user/import.json"
                onChange={this.onUpLoadChange}
                >
                    <Button type="primary" >{this.state.uploadText}</Button>
                </Upload>
                <Button type="primary" style={{marginLeft: '10px'}} onClick={this.export}>导出</Button>
                <Button type="primary" style={{marginLeft: '10px'}} onClick={this.export}>全部删除</Button>
            </div>
        );
    }
}

export default ActionButtons;