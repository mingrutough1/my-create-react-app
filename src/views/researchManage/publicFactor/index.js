import React from 'react';
import style from './style.module.scss';

import FilterForms from './FilterForms';
import ActionButtons from './ActionButtons';
import Lists from './Lists';


class PublicFactor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            factorListData: [],
            loading: false,
            factorId: '',
            factorCode: '',
            factorName: '',
            tier: '',
            objectType: '',
            isBottom: 'all',
            isCalced: 'all',
            pno: 1,
            size: 10,
            total: 0,
        };
    }
    resetFormAndGet = () =>{
        this.setState({
            factorId: '',
            factorCode: '',
            factorName: '',
            tier: '',
            objectType: '',
            isBottom: 'all',
            isCalced: 'all',
            pno: 1,
            size: 10,
            total: 0,
        }, ()=> {
            this.getFactors();
        });
    }
    setCurPageAndGet = (pno) => {
        this.setState({
            pno,
        }, ()=> {
            this.getFactors();
        });
    }
    componentWillMount() {
        this.getFactors();
    }
    setFormState = (key, value) =>{
        this.setState({ 
            [key]: value    
        });
    }
    getFactors = () => {
        const {factorId, factorCode, factorName, tier, objectType, isBottom, isCalced, pno, size} = this.state;
        const params = {
            factorId,
            factorCode,
            factorName,
            tier,
            objectType,
            pno,
            size
        };
        if (isBottom !== 'all') {
            params.isBottom = Boolean(isBottom);
        }
        if (isCalced !== 'all') {
            params.isCalced = Boolean(isCalced);
        }
        this.setState({
            loading: true
        });
        $axios.get('/factor/query.json', {
            params,
        }).then((res) => {
            if (res.data.code === '0') {
                const data = res.data.data;
                const result = data.result || [];
                result.forEach((item, index) => {
                    item.order = (data.pno - 1)*10 + index + 1;
                    item.key = item.pid;
                });
                this.setState({
                    factorListData: result,
                    pno: data.pno,
                    size: data.size,
                    total: data.total,
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    render() {
        const {factorId, factorCode, factorName, tier, objectType, isBottom, isCalced, pno, size, total} = this.state;
        const form = {
            factorId,
            factorCode,
            factorName,
            tier,
            objectType,
            isBottom,
            isCalced,
            setFormState: this.setFormState
        }
        const pagi = {
            pno,
            size,
            total,
            setCurPageAndGet: this.setCurPageAndGet
        }
        return (
            <div className={style.container}>
                <FilterForms getFactors={this.getFactors} {...form}></FilterForms>
                <ActionButtons resetFormAndGet={this.resetFormAndGet}></ActionButtons>
                <Lists factorListData={this.state.factorListData} loading={this.state.loading} {...pagi} getFactors={this.getFactors}></Lists>
            </div>
        );
    }
}

export default PublicFactor;
