import React from 'react';
import { Modal, Button } from 'antd';



class NewUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    handleOk = () => {
        this.props.toggleVisible(false);
    }
    handleCancel = () => {
        this.props.toggleVisible(false);
    }
    render() {
        return (
            <Modal
            title="Title"
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>新建用户</p>
          </Modal>  
        );
    }
}

export default NewUserModal;