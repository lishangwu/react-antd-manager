import React from 'react'
import { Button, Card, Modal, message } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'

export default class RichText extends React.Component {
    state = {
        showRichText: false,
        editorContent: '',
        editorState: '',
    };

    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }
    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    render() {
        return (
            <div>
                <Card title='富文本' style={{ margin: 10 }}>
                    <Button type="warning" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title='富文本编辑器' style={{ margin: 10 }}>
                    <Editor
                        editorState={this.state.editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    ></Editor>
                </Card>
                <Card title='富文本编辑器-预览' style={{ margin: 10 }}>
                    {draftjs(this.state.editorContent)}
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={() => {
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.editorContent)}
                </Modal>
            </div>
        )
    }
}