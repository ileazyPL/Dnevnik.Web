import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Label, Col, Alert } from 'reactstrap';
import MDEditor from '@uiw/react-md-editor';

export class Medium extends Component {
    static displayName = Medium.name;

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
            isSent: false,
            isError: false,
            isTitleValid: undefined
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value,
            isTitleValid: !!e.target.value // falsy -- "" ~ false -> !"" === true -> !true == false
        });
    }

    handleTextChange(text) {
        this.setState({
            text: text
        });
    }

    //    получаем соответствующие куки
    accessCookie(cookieName) {
        var name = cookieName + "=";
        var allCookieArray = document.cookie.split(';');
        for (var i = 0; i < allCookieArray.length; i++) {
            var temp = allCookieArray[i].trim();
            if (temp.indexOf(name) == 0)
                return temp.substring(name.length, temp.length);
        }
        return "";
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validateFields()) {

            var file = document.getElementById("file").files[0];

            // key=value&key2=value2

            var nickname = this.accessCookie('mediumEditorWebNickname');
            var password = this.accessCookie('mediumEditorWebPassword');

            var data = new FormData();
            data.append('file', file);
            data.append('title', this.state.title);
            data.append('text', this.state.text);
            data.append('nickname', nickname);
            data.append('password', password);

            fetch('/mediumservice/upload',
                {
                    headers: {
                        //'Content-Type': 'multipart/form-data'
                    },
                    method: "POST",
                    body: new FormData(document.getElementsByTagName("form")[0])
                })
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw response.statusText;
                })
                .then(text => console.log(text))
                .catch(e => console.log(e));

            fetch('/mediumservice/upload2',
                {
                    method: 'POST',
                    headers: {
                        // Content-Type may need to be completely **omitted**
                        // or you may need something
                        // "Content-Type": "You will perhaps need to define a content-type here"
                    },
                    body: data // This is your file object
                })
                .then(response => {
                    if (response.redirected) {
                        window.open(response.url, "_blank");
                    }
                    else {
                        console.log(response.statusText)
                    }
                });

            fetch('/mediumservice',
                {
                    headers: {
                        //'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: data
                    //body: JSON.stringify(
                    //    {
                    //        Title: this.state.title,
                    //        Text: this.state.text
                    //    })
                })
                .then(response => {
                    if (response.ok) {                        
                        return response.text();
                    }

                    throw response.statusText;
                })
                .then(text => {
                    this.setState({
                        title: '',
                        text: '',
                        isSent: true,
                        isError: false,
                        lastPostLink: text
                    });
                })
                .catch(response => {
                    this.setState({
                        isError: true,
                        isSent: false
                    });
                })
        }
    }

    validateFields() {
        var isValid = true;

        if (!this.state.title) { // title -> undefined, '', null ...
            this.setState({
                isTitleValid: false
            })

            isValid = false;
        }

        return isValid;
    }

    render() {
        return (
            <div>

                <Alert isOpen={this.state.isSent} fade>
                    Спасибо, <a target="_blank" href={this.state.lastPostLink}>ваше сообщение</a> отправлено!
                </Alert>

                <Alert isOpen={this.state.isError} color="danger">
                    Произошла ошибка!
                </Alert>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row className='mb-3'>
                        <Label for="title" sm={2}>
                            Заголовок
                        </Label>
                        <Col sm={10}>
                            <Input
                                invalid={this.state.isTitleValid === false ? true : undefined}
                                id="title"
                                name="title"
                                type="text"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </Col>
                    </FormGroup>
                    {' '}
                    <FormGroup row className='mb-3'>
                        <Label for="text" sm={2}>
                            Текст
                        </Label>
                        <Col sm={10}>
                            <MDEditor
                                value={this.state.text}
                                onChange={this.handleTextChange} />
                            {/*<MDEditor.Markdown source={this.state.text} style={{ whiteSpace: 'pre-wrap' }} />*/}
                        </Col>
                    </FormGroup>
                    {' '}
                    
                    <FormGroup row className='mb-3'>
                        <Label for="file" sm={2}>
                            Изображение
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                
                            />
                        </Col>
                    </FormGroup>
                    
                    {' '}
                    <Button>
                        Создать
                    </Button>
                </Form>
            </div>
        );
    }
}
