import React, { Component } from 'react'
import { Table, Icon, Switch, Radio, Form, Divider } from 'choerodon-ui';
import Drop4 from './drop4'
import './table1.less'
import store from './Store'
import { observer } from 'mobx-react';

const FormItem = Form.Item;

const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: '名称',
    width: 210,
    render: text => <a href="#">{text}</a>,
}, {
    title: '编码',
    dataIndex: 'code',
    key: '编码',
    width: 420,
}, {
    title: '层级',
    dataIndex: 'level',
    key: '层级',
    width: 280,
    render: (value) => {
        if (value === "organization") {
            return '组织';
        } else if (value === "site") {
            return '全局';
        } else {
            return '项目';
        }
    },
    filters: [{
        text: '组织',
        value: 'organization',
    }, {
        text: '全局',
        value: 'site',
    }, {
        text: '项目',
        value: 'project',
    }],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.level.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
}, {
    title: '来源',
    dataIndex: 'objectVersionNumber',
    key: 'action',
    width: 220,
    // render: (text, record) => (
    //     <span>
    //         <Icon type="unfinished_question" /> &nbsp;自定义
    //     </span>
    // ),
}, {
    title: '状态',
    key: 'action',
    dataIndex: 'enabled',
    width: 220,
    render: (value) => {
        if (value === true) {
            return <span><Icon type="check_box" style={{ color: '#00bfa5' }} />&nbsp;启用</span>;
        } else if (value === false) {
            return <span><Icon type="check_box" style={{ color: '#00bfa5' }} />&nbsp;停用</span>;
        }
    },
}, {
    title: '创建和修改',
    key: 'action',
    width: 80,
    render: (text, record) => (
        <Drop4 />
    ),
}];

const data = store.data;

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const footer = () => '';
const scroll = { y: 240 };
const { pagination } = store;

@observer
export default class table1 extends Component {
    state = {
        bordered: false,
        loading: false,
        pagination,
        size: 'default',
        expandedRowRender,
        title: undefined,
        showHeader,
        footer,
        rowSelection: {},
        scroll: undefined,
    }
    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        store.loadData();
    }
    handleToggle = (prop) => {
        return (enable) => {
            this.setState({ [prop]: enable });
        };
    }

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

    handleExpandChange = (enable) => {
        this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
    }

    handleTitleChange = (enable) => {
        this.setState({ title: enable ? title : undefined });
    }

    handleHeaderChange = (enable) => {
        this.setState({ showHeader: enable ? showHeader : false });
    }

    handleFooterChange = (enable) => {
        this.setState({ footer: enable ? footer : undefined });
    }

    handleRowSelectionChange = (enable) => {
        this.setState({ rowSelection: enable ? {} : undefined });
    }

    handleScollChange = (enable) => {
        this.setState({ scroll: enable ? scroll : undefined });
    }

    handlePaginationChange = (e) => {
        const { value } = e.target;
        this.setState({
            pagination: value === 'none' ? false : { position: value },

        });
    }

    handlePageChange(pagination) {
        if (pagination) {
            console.log(pagination)
            store.setPageNation(pagination);
            store.loadData()
        }
    }

    render() {
        const state = this.state;
        return (
            <div>
                <div className="components-table-demo-control-bar" style={{ width: '80%' }}>

                </div>
                <Table columns={columns} dataSource={store.getData}
                  onChange={this.handlePageChange}  {...this.state} pagination={store.pagination}
                />
            </div>
        )
    }
}
