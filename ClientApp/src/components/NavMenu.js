import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;


    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.passwordkontrol = this.passwordkontrol.bind(this);
        this.exit = this.exit.bind(this);

        this.state = {
            pagenewmessage: '/registration',
            pagehistorymessage: '/registration',
            collapsed: true,
            isPasswordError: true,

        };
        this.passwordkontrol();
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
    //    Записываем куки
    createCookieInHour(cookieName, cookieValue, hourToExpire) {
        let date = new Date();
        date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
        document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
    }
    exit() {
        this.createCookieInHour('mediumEditorWebNickname', '0', 1);
        this.createCookieInHour('mediumEditorWebPassword', '0', 1);
        this.passwordkontrol();
        this.setState({
            pagenewmessage: '/registration',
            pagehistorymessage: '/registration',
            collapsed: true,
            isPasswordError: true,
        });

    }
    passwordkontrol() {
        var nickname = this.accessCookie('mediumEditorWebNickname');
        var password = this.accessCookie('mediumEditorWebPassword');

        var data = new FormData();
        data.append('nickname', nickname);
        data.append('password', password);

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
                        isPasswordError: responseText == ':('
                    }
                    );
                    if (this.state.isPasswordError == false) {
                        this.setState({
                            pagenewmessage: '/medium',
                            pagehistorymessage: '/fetch-data'
                        })
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

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Дневник.Web</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                {/*<NavItem>*/}
                                {/*    <NavLink tag={Link} className="text-dark" to="/registration">Регистрация</NavLink>*/}
                                {/*</NavItem>*/}
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Регистрация/(вход)</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to={this.state.pagenewmessage}/*"/medium"*/ onClick={this.passwordkontrol}>Новый пост</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to={this.state.pagehistorymessage}/*"/fetch-data"*/ onClick={this.passwordkontrol}>История</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/" onClick={this.exit}>Выход</NavLink>
                                    </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
