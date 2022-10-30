import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {

    // React JSX

    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
          { /* Renderbody() */}
        </Container>
      </div>
    );
  }
}
