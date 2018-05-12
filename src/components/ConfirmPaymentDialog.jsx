import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, FontIcon } from 'react-md';
import DialogContainer from './DialogContainer';
import UserTag from './UserTag';

/* eslint-disable */
const data = {
  "id": 1001,
  "name": "Eduardo Santos",
  "img": "https://randomuser.me/api/portraits/men/9.jpg",
  "username": "@eduardo.santos"
}
/* eslint-enable */

export default class SimpleListDialog extends React.PureComponent {
  render() {
    const { visible } = this.props;
    return (
      <div>
        <DialogContainer
          id="simple-list-dialog"
          visible={visible}
          onHide={this.hide}
          dialogClassName="dialog"
          title="New Event"
          actions={[
            <Button raised className="button--primary dialog-button--only-one" >Confirm</Button>,
          ]}
        >
          <div className="flexbox-center--column">
            <UserTag user={data} />
            <Divider className="divider" />
            <li className="flexbox-center">
              <FontIcon className="error" style={{ marginRight: '12px' }}>error</FontIcon>
              <div>
                <p className="error" style={{ marginBottom: '0' }}>Nenhum cartão de crédito cadastrado.</p>
                <Link
                  to="/"
                  className="error"
                  style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                >Cadastrar agora.</Link>
              </div>
            </li>
          </div>
        </DialogContainer>
      </div>
    );
  }
}
