import React from 'react'
import { Card, Table, Modal, message, Button } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/util'

export default class BasicTable extends React.Component {

    state = {
        dataSource2: []
    }
    params = {
        page: 1
    }

    componentDidMount() {
        const data = []
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                userName: '胡彦祖' + i,
                sex: 42,
                state: '1',
                interest: '1',
                birthday: '0000-00-00',
                address: '西湖区湖底公园1号',
                time: '09:00',
            })
        }
        data.map((item, index) => {
            item.key = index
        })
        this.setState({
            dataSource2: data,
        })
        // this.request()
    }

    onRowClick = (record, index) => {
        let selectKey = [index]
        Modal.info({
            title: 'info',
            content: 'username:' + record.username
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    request = () => {
        let _this = this
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            },
            cu:true

        }).then(res => {
            if (res.code === 0) {
                console.log(res.result);
                res.result.list.map((item, index) => {
                    item.key = index
                })
                let data = res
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: {
                            onChange: (current) => {
                                console.log('current: ', current);
                                // callback(current)
                                _this.params.page = current
                                this.request()
                            },
                            current: data.result.page,
                            pageSize: data.result.page_size,
                            total: data.result.total_count,
                            showTotal: () => {
                                return `共${data.result.total_count}条..`
                            },
                            showQuickJumper: true
                    },
                    pagination2: Utils.pagination(res, (current)=>{
                        _this.params.page = current
                        this.request()
                    })
                })
            }
        })
    }

    handleDelete = () => {
        let rows = this.state.selectedRows
        if (!rows || rows.length == 0) {
            message.warning('rows == 0')
            return
        }
        let ids = []
        rows.map(item => {
            ids.push(item.id)
        })
        Modal.confirm({
            title: '删除提示',
            content: '确定删除 ？ ' + ids.join(','),
            onOk: () => {
                message.success('删除成功')
                this.request()
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: 'userName',
                dataIndex: 'userName'
            },
            {
                title: 'sex',
                dataIndex: 'sex',
                render(sex) { return sex == 1 ? '男' : '女' }
            },
            {
                title: 'state',
                dataIndex: 'state'
            },
            {
                title: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        1: 'sb1',
                        2: 'sb2',
                        3: 'sb3',
                        4: 'sb4',
                        5: 'sb5',
                        6: 'sb6',
                        7: 'sb7',
                        8: 'sb8',
                    }
                    return config[abc]
                }
            },
            {
                title: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'address',
                dataIndex: 'address'
            },
            {
                title: 'time',
                dataIndex: 'time'
            },
        ]
        const { selectedRowKeys, selectedRowKeys2 } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title='基础表格'>
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={true}
                    />
                </Card>
                <Card title='动态数据' style={{ margin: '10px' }}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={true}
                    />
                </Card>
                <Card title='mock-单选' style={{ margin: '10px' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={true}
                    />
                </Card>
                <Card title='mock-多选' style={{ margin: '10px' }}>
                    <div>
                        <Button style={{ marginBottom: '10px' }} onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={true}
                    />
                </Card>
                <Card title='mock-分页' style={{ margin: '10px' }}>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}