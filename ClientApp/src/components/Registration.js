import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Label, Col, Alert } from 'reactstrap';
import MDEditor from '@uiw/react-md-editor';

export class Registration extends Component {
    static displayName = Registration.name;

    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            password: '',
            token: '',
            confirmationpassword: '',
            isNameError: false,
            isSent: false,
            isError: false,
            isPasswordError: false,
            isTokenError: false,
            isNameExist: false
        };

        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleTokenChange = this.handleTokenChange.bind(this);
        this.handleConfirmationpasswordChange = this.handleConfirmationpasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNicknameChange(nickname) {
        this.setState({
            nickname: nickname.target.value
        });
        //nekor = "@#%()*&^!?/.,\|+=-:;",
        //    probel = ' ';
    }

    handlePasswordChange(text) {
        this.setState({
            password: text.target.value,
            isError: false,
            isPasswordError: false,
            isTokenError: false
        });
    }

    handleTokenChange(text) {
        this.setState({
            token: text.target.value,
            isPasswordError: false,
            isTokenError: false
        });
    }

    handleConfirmationpasswordChange(text) {
        this.setState({
            confirmationpassword: text.target.value,
            isError: false,
            isPasswordError: false,
            isTokenError: false
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.nickname.length < 4 || this.state.nickname.length > 16) {
            this.setState({
                isNameError: true,
                isSent: false
            });
            return;
        }
        if (this.state.password != this.state.confirmationpassword) {
            this.setState({
                isError: true,
                isSent: false
            });
            return;
        }
        if (this.state.password.length < 4 || this.state.password.length > 16) {
            this.setState({
                isPasswordError: true,
                isSent: false
            });
            return;
        }
        if (this.state.token.length != 65) {
            this.setState({
                isTokenError: true,
                isSent: false
            });
            return;
        }
        this.setState({
            isError: false,
            isPasswordError: false,
            isTokenError: false,
            isSent: false,
            isNameError: false,
            isNameExist: false
        });

        var data = new FormData();
        data.append('nickname', this.state.nickname);
        data.append('password', this.state.password);
        data.append('token', this.state.token);
        data.append('confirmationpassword', this.state.confirmationpassword);

        fetch('/registrationservice',
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
            .then(response => response.text())
            .then(
                responseText => {
                    this.setState({
                        isSent: responseText == ':)',
                        isNameExist: responseText != ':)'
                    }
                    );
                }
            )
            .catch(response => {
                this.setState({
                    isError: true,
                    isSent: false
                });
            });

    }


    render() {
        return (
            <div>
                <Alert isOpen={this.state.isError} color="danger">
                    Пароль не совпадает!
                </Alert>
                <Alert isOpen={this.state.isNameError} color="danger">
                    Неверно набран никнейм!
                    (4 ... 16)
                </Alert>
                <Alert isOpen={this.state.isNameExist} color="danger">
                    Такое имя пользователя уже существует!
                </Alert>
                <Alert isOpen={this.state.isTokenError} color="danger">
                    Неверно набран токен!
                    (65)
                </Alert>
                <Alert isOpen={this.state.isPasswordError} color="danger">
                    Неверно набран пароль!
                    (4 ... 16)
                </Alert>
                <Alert isOpen={this.state.isSent} color="success">
                    Готово 
                </Alert>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row className='mb-3'>
                        <Label for="nickname" sm={2}>
                            введите имя
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="nickname"
                                name="nickname"
                                type="text"
                                value={this.state.nickname}
                                onChange={this.handleNicknameChange}
                            />
                        </Col>
                    </FormGroup>
                    {' '}
                    <FormGroup row className='mb-3'>
                        <Label for="password" sm={2}>
                            введите пароль
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </Col>
                    </FormGroup>
                    {' '}
                    <FormGroup row className='mb-3'>
                        <Label for="confirmationpassword" sm={2}>
                            подтвердите ваш пароль
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="confirmationpassword"
                                name="confirmationpassword"
                                type="password"
                                value={this.state.confirmationpassword}
                                onChange={this.handleConfirmationpasswordChange}
                            />
                        </Col>
                    </FormGroup>
                    {' '}
                    <FormGroup row className='mb-3'>
                        <Label for="token" sm={2}>
                            ваш токен медиа-сервис
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="token"
                                name="token"
                                type="text"
                                value={this.state.token}
                                onChange={this.handleTokenChange}
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
