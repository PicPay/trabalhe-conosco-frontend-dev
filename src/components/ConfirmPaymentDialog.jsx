import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, FontIcon, TextField } from 'react-md';
import DialogContainer from './DialogContainer';
import UserTag from './UserTag';
import * as routes from '../constants/routes';

/* eslint-disable */
const data = {
  "id": 1001,
  "name": "Eduardo Santos",
  "img": "https://randomuser.me/api/portraits/men/9.jpg",
  "username": "@eduardo.santos"
}
/* eslint-enable */

export default class SimpleListDialog extends React.PureComponent {
  state = {
    value: '',
    error: '',
  }
  handleChange = (value) => {
    const filteredValue = value.replace(/[^\d]/g, '');
    const length = filteredValue.length;
    let finalValue;
    if (length > 1) {
      finalValue = `${filteredValue.slice(0, -2)},${filteredValue.slice(-2)}`;
    } else {
      finalValue = filteredValue;
    }
    this.setState({ value: finalValue });
  }
  render() {
    const { visible } = this.props;
    const { value, error } = this.state;
    const { name } = data
    return (
      <div>
        <DialogContainer
          id="confirm-payment"
          visible={visible}
          onHide={this.hide}
          title={<div>
            Pagamento para <span className="md-text--theme-secondary">{name}</span>
          </div>}
          actions={[
            <Button raised className="button--primary dialog-button--only-one" >Confirm</Button>,
          ]}
        >
          <div className="flexbox-center--column">
            <UserTag user={data} />
            <TextField
              id="quantity"
              placeholder="R$ 0,00"
              className="quantity-field"
              inputClassName="quantity-input"
              value={value}
              onChange={this.handleChange}
              error={Boolean(error)}
              errorText={error}
            />
            <Divider className="divider" />
            <li className="flexbox-center">
              <FontIcon className="error" style={{ marginRight: '12px' }}>error</FontIcon>
              <div>
                <p className="error" style={{ marginBottom: '0' }}>Nenhum cartão de crédito cadastrado.</p>
                <Link
                  to={routes.REGISTER_CARD}
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
