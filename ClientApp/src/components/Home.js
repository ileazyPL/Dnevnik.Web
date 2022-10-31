import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Label, Col, Alert } from 'reactstrap';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            password: '',
            isNameError: false,
            isSent: false,
            isError: false,
            isPasswordError: false,
            isPasswordok: false,
        };

        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //    Записываем куки
    createCookieInHour(cookieName, cookieValue, hourToExpire) {
        let date = new Date();
        date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
        document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
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
    handleSubmit(e) {
        this.createCookieInHour('mediumEditorWebNickname', '0', 1);
        this.createCookieInHour('mediumEditorWebPassword', '0', 1);
        e.preventDefault();
        if (this.state.nickname.length < 4 || this.state.nickname.length > 16) {
            this.setState({
                isNameError: true,
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
        this.setState({
            isError: false,
            isPasswordError: false,
            isTokenError: false,
            isSent: true
        });

        var data = new FormData();
        data.append('nickname', this.state.nickname);
        data.append('password', this.state.password);

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
                        isPasswordok: responseText == ':)',
                        isPasswordError: responseText == ':('
                    }
                    );
                    if (this.state.isPasswordok) {
                        this.createCookieInHour('mediumEditorWebNickname', this.state.nickname, 100);
                        this.createCookieInHour('mediumEditorWebPassword', this.state.password, 100);
                    }
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
                <div>
                    <h1>Дневник!</h1>
                    <p>Добро пожаловать в паблик "Мой Дневник":</p>
                    <ul>
                        <li>Для начала работы перейдити в отдел "Регистрация" и создайте личную страницу :)</li>
                        <li>Нажмите "Новый пост", чтобы поделиться новостями</li>
                        <li>Ознакомтесь с новыми вожможносятями данного сайта</li>
                        <li>Попробуйте найти новых друзей </li>
                    </ul>
                </div>
                <div>
                    <Alert isOpen={this.state.isPasswordError} color="danger">
                        Неверно набрано поле!
                    </Alert>
                    <Alert isOpen={this.state.isPasswordok} color="success">
                        OK :)
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
                        <Button>
                            Войти
                        </Button>
                        <br />
                        <br/>
                        <a href="/registration"> Зарегистрироваться
                        </a>
                    </Form>

                </div>
            </div>
        );
    }
}
