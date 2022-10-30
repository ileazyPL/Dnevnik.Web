import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Дневник!</h1>
        <p>Добро пожаловать в паблик "Мой Дневник":</p>
        <ul>
          <li>Нажмите ДОБАВИТЬ, чтобы поделиться новостями</li>
          <li>Ознакомтесь с новыми вожможносятями данного сайта</li>
          <li>Попробуйте найти новых друзей </li>
        </ul>
       </div>
    );
  }
}
