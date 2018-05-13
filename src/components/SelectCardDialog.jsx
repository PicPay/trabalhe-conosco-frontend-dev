import React from 'react';
import { FontIcon, List, ListItem } from 'react-md';
import DialogContainer from './DialogContainer';
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
    const { visible, onHide, history } = this.props;
    return (
      <div>
        <DialogContainer
          id="confirm-payment"
          visible={visible}
          onHide={onHide}
          title="Selecionar Cartão de Crédito"
        >
          <div className="flexbox-center--column" style={{ paddingTop: '24px' }}>
            <h3 className="primary-color">Cartões Cadastrados</h3>
            <List>
              <ListItem
                className="list-item--card"
                primaryText="11111 11 11 1 111 11"
                leftIcon={<FontIcon primary>credit_card</FontIcon>}
              />
              <ListItem
                className="list-item--card"
                primaryText="11111 11 11 1 111 11"
                leftIcon={<FontIcon primary>credit_card</FontIcon>}
              />
              <ListItem
                className="list-item--card"
                primaryText="11111 11 11 1 111 11"
                leftIcon={<FontIcon primary>credit_card</FontIcon>}
              />
              <ListItem
                style={{ cursor: 'pointer' }}
                className="list-item--card"
                primaryText="Cadastrar novo cartão"
                onClick={() => history.replace(routes.REGISTER_CARD)}
                leftIcon={<FontIcon primary>add</FontIcon>}
              />
            </List>
          </div>
        </DialogContainer>
      </div>
    );
  }
}
