/* eslint react/no-did-update-set-state: 0 */
import React from 'react';
import { Button, Divider } from 'react-md';
import { format } from 'date-fns';
import DialogContainer from './DialogContainer';
import UserTag from './UserTag';
import { hideCard, maskCurrency } from '../utils/masks';

export default class PaymentReceipt extends React.PureComponent {
  render() {
    const { visible, cardNumber, onHide, user, transaction, payAgain } = this.props;
    return (
      <div>
        <DialogContainer
          id="confirm-payment"
          visible={visible}
          onHide={onHide}
          title={!transaction
            ? 'Nenhum recibo foi selecionado'
            : 'Recibo'}
          actions={
            <div className="dialog__footer--with-two-buttons">
              <Button
                raised
                className="button--secondary dialog-button--with-two"
                onClick={onHide}
              >VOLTAR</Button>
              <Button
                raised
                className="button--primary dialog-button--with-two"
                onClick={payAgain}
              >PAGAR NOVAMENTE</Button>
            </div>
          }
        >
          {transaction && cardNumber && <div className="flexbox-center--column">
            {user && <UserTag user={user} />}
            <h2 className="primary-color" style={{ marginBottom: '24px', textAlign: 'center' }} >
              {transaction.success ? 'Pagamento confirmado!' : 'Não foi possível efetuar o pagamento!'}
            </h2>
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
              <p>{hideCard(cardNumber)}</p>
            </div>
            <Divider className="transaction-row__divider" />
            <div className="transaction-row">
              <p>Valor</p>
              <p>{maskCurrency(transaction.value)}</p>
            </div>
            <Divider className="transaction-row__divider" />
          </div>}
        </DialogContainer>
      </div>
    );
  }
}
