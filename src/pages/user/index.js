import React from 'react'
import { Card, Button, Table, Form, Input, Checkbox, Select, Radio, Icon, message, Modal, DatePicker } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/util'
import Moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
export default class User extends React.Component {

    state = {
        list: [],
        selectedRowKeys:[]
    }
    params = {
        page: 1
    }
    // this.setState({
    //     selectedRowKeys: selectKey,
    //     selectedItem: record
    // })
    requestList = () => {
        axios.ajax({
            url: '/table/list1',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then(res => {
            let _this = this
            this.setState({
                list: res.result.list.map((item, index) => {
                    item.key = index;
                    return item
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList()
                }),
                pagination2: {
                    onChange: (current) => {
                        _this.params.page = current;
                        _this.requestList()
                    },
                    current: res.result.page,
                    pageSize: res.result.page_size,
                    total: res.result.total_count,
                    showTotal: () => {
                        return `共${res.result.total_count}条..`
                    },
                    showQuickJumper: true,
                    position: 'top'
                }
            })
        })
    }
    componentDidMount() {
        this.requestList();
    }

    handleOperator = (type) => {
        let item = this.state.selectedItem
        this.setState({type})
        if(type == 'create'){
            this.setState({selectedRowKeys:[], selectedItem:''})
            this.setState({
                title:'创建员工',
                isVisible:true,
                type
            })
        }else if(type == 'edit' || type == 'detail'){
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                title: type == 'edit' ? '编辑员工' : '员工详情',
                isVisible:true,
                type
            })
        }else if(type == 'delete'){
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一个用户'
                })
                return;
            }
            Modal.confirm({
                title:'确定删除此用户?',
                onOk:()=>{
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        if(res.code == 0){
                            message.info('type: ' + type + ' res: ' + res.code)
                            this.setState({isVisible:false, selectedRowKeys:[]})
                            this.requestList()
                        }
                    })
                }
            })

        }
    }
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue()
        axios.ajax({
            url: type == 'create' ? '/user/add' : '/user/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then(res=>{
            if(res.code == 0){
                message.info('type: ' + type + ' res: ' + res.code)
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }
    rowSelection = () => {
        return {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                //   disabled: record.sex == '1', // Column configuration not to be checked
                name: record.name,
            }),
            selectedRowKeys: this.state.selectedRowKeys
        }
    };

    render() {
        const { list, pagination, pagination2 } = this.state
        const columns = [
            { title: 'id', dataIndex: 'id' },
            { title: '用户名', dataIndex: 'username' },
            { title: '性别', dataIndex: 'sex', render(sex) { return sex == 1 ? '男' : '女' } },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子一枚',
                        '4': '百度FE',
                        '5': '创业者'
                    }[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    return {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }[interest]
                }
            },
            {
                title: '爱好',
                dataIndex: 'isMarried',
                render(isMarried) {
                    return isMarried ? '已婚' : '未婚'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]

        return (
            <div>
                <Card>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名'></Input>
                        </FormItem>
                        <FormItem>
                            <Input type='password' placeholder='请输入密码'></Input>
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登  录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type='primary' icon='plus' onClick={() => this.handleOperator('create')}>创建员工</Button>
                    <Button type='primary' icon='edit' onClick={() => this.handleOperator('edit')}>编辑员工</Button>
                    <Button type='primary' onClick={() => this.handleOperator('detail')}>员工详情</Button>
                    <Button type='danger' icon='delete' onClick={() => this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className='content-wrap'>
                    <Table
                        dataSource={list}
                        columns={columns}
                        pagination={pagination2}
                        rowSelection={this.rowSelection()}
                        onRow={(recor, index) => {
                            return {
                                onClick: event => {
                                    this.state.selectedRowKeys.indexOf(index) == -1 ?
                                    this.setState({selectedRowKeys:[index], selectedItem:recor}) :
                                    this.setState({selectedRowKeys:[], selectedItem:''})
                                }, // 点击行
                            };
                        }}
                        onHeaderRow={column => {
                            return {
                                onClick: () => { console.log('onHeaderRow',column); }, // 点击表头行
                            };
                        }}
                    />;
                </div>
                <Modal
                    title={this.state.title || ''}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false,
                            userInfo: '',
                            // selectedItem:'',
                            // selectedRowKeys:[]
                        })
                    }}
                >
                    <UserForm userInfo={this.state.selectedItem} type={this.state.type} wrappedComponentRef={(inst)=>this.userForm = inst}></UserForm>
                </Modal>

            </div>
        )
    }
}

class UserForm extends React.Component {
    getState = (state)=>{
        return {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子一枚',
            '4':'百度FE',
            '5':'创业者'
        }[state]
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <Form layout='horizontal'>
                <FormItem label='姓名' {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.username
                        })(
                            <Input type="text" placeholder="请输入姓名"/>
                        )
                    }
                </FormItem>
                <FormItem label='性别' {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?userInfo.sex == 1 ? '男' : '女':
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label='状态' {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?this.getState(userInfo.state):
                        getFieldDecorator('sex',{
                            initialValue:userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子一枚</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:Moment(userInfo.birthday)
                        })(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                        <Input.TextArea rows={3} placeholder="请输入联系地址"/>
                    )}
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)