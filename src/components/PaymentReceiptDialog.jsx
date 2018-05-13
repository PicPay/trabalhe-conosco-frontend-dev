/* eslint react/no-did-update-set-state: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, FontIcon, TextField } from 'react-md';
import { format } from 'date-fns'
import DialogContainer from './DialogContainer';
import UserTag from './UserTag';
import * as routes from '../constants/routes';
const data = {
  "transaction": {
    "id": 12314,
    "timestamp": 1525616015,
    "value": 79.9,
    "destination_user": {
      "id": 1002,
      "name": "Marina Coelho",
      "img": "https://randomuser.me/api/portraits/women/37.jpg",
      "username": "@marina.coelho"
    },
    "success": true,
    "status": "Aprovada"
  }
}

const initialState = {
  value: '',
  error: '',
};
export default class PaymentReceipt extends React.PureComponent {
  state = initialState
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) this.setState(initialState);
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
    const { visible, selectedCard, onHide, user } = this.props;
    const { value, error } = this.state;
    const { id: userId, name } = user || {};
    const { transaction } = data || {};
    return (
      <div>
        <DialogContainer
          id="confirm-payment"
          visible={visible}
          onHide={onHide}
          title={!name
            ? 'Nenhum recibo foi selecionado'
            : 'Recibo'}
          actions={
            <div className="dialog__footer--with-two-buttons">
              <Button raised className="button--secondary dialog-button--with-two" >VOLTAR</Button>
              <Button raised className="button--primary dialog-button--with-two" >PAGAR NOVAMENTE</Button>
            </div>
          }
        >
          <div className="flexbox-center--column">
            {user && <UserTag user={user} />}
            <h2 className="primary-color" style={{ marginBottom: '24px' }} >Pagamento confirmado!</h2>
            <div className="transaction-row">
              <p>Transação</p>
              <p>{transaction.id}</p>
            </div>
            <Divider className="transaction-row__divider" />
            <div className="transaction-row">
              <p>Data</p>
              <p>{format(transaction.timestamp, 'DD/MM/YYYY - HH:mm')}</p>
            </div>
            <Divider className="transaction-row__divider" />
            <div className="transaction-row">
              <p>Cartão</p>
              <p>{selectedCard.cardNumber}</p>
            </div>
            <Divider className="transaction-row__divider" />
            <div className="transaction-row">
              <p>Valor</p>
              <p>{transaction.value}</p>
            </div>
            <Divider className="transaction-row__divider" />
          </div>
        </DialogContainer>
      </div>
    );
  }
}
