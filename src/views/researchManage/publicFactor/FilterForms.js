import React from 'react';
import { Form, Input, Select, Button } from 'antd';

import style from './style.module.scss';

const { Option } = Select;
class FilterForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objectTypeOptions: []
        };
    }
    componentWillMount() {
        $axios.get('/factor/object/type.json').then((res) => {
            if (res.data.code === '0') {
                this.setState({
                    objectTypeOptions: res.data.data 
                });
            }
        });
    }
    getFactors = () => {
        setTimeout(() => {
            this.props.setFormState('pno', 1);
            this.props.getFactors();
        }, 0);
    }
    handleInputChange = type => (e) => {
        this.props.setFormState(type, e.target.value);
    }
    handleSelectChange = type => (value) => {
        this.props.setFormState(type, value);
    }
    render() {
        const {factorId, factorCode, factorName, tier, objectType, isBottom, isCalced} = this.props;
        return (
            <div className={style.formCon}>
                <Form layout="inline">
                    <Form.Item label="因子ID：">
                        <Input value={factorId} onChange={this.handleInputChange('factorId')} allowClear/>
                    </Form.Item>
                    <Form.Item label="因子code：">
                        <Input value={factorCode} onChange={this.handleInputChange('factorCode')} allowClear/>
                    </Form.Item>
                    <Form.Item label="因子名称：">
                        <Input value={factorName} onChange={this.handleInputChange('factorName')} allowClear/>
                    </Form.Item>
                    <Form.Item label="层级：">
                        <Input value={tier} onChange={this.handleInputChange('tier')} allowClear/>
                    </Form.Item>
                    <Form.Item label="对象类型：">
                        <Select value={objectType} style={{ width: 120 }} onChange={this.handleSelectChange('objectType')}>
                            {
                                this.state.objectTypeOptions.map(item =>(
                                    item ? <Option value={item} key={item}>{item}</Option> : null
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="是否底层：">
                        <Select value={isBottom} style={{ width: 120 }} onChange={this.handleSelectChange('isBottom')}>
                            <Option value="all">全部</Option>
                            <Option value="true">是</Option>
                            <Option value="">否</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="是否计算：">
                        <Select value={isCalced} style={{ width: 120 }} onChange={this.handleSelectChange('isCalced')}>
                            <Option value="all">全部</Option>
                            <Option value="true">是</Option>
                            <Option value="">否</Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" className={style.rightBtn} onClick={this.getFactors}>确定</Button>
                </Form>
            </div>
        );
    }
}

export default FilterForms;