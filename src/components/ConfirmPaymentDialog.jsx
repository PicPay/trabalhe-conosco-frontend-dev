/* eslint react/no-did-update-set-state: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, FontIcon, TextField, CircularProgress } from 'react-md';
import DialogContainer from './DialogContainer';
import UserTag from './UserTag';
import * as routes from '../constants/routes';
import { unmaskCurrency2Float } from '../utils/masks';

const initialState = {
  value: '',
  error: '',
};
export default class ConfirmPaymentDialog extends React.PureComponent {
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
    this.setState({ value: finalValue, error: '' });
  }
  isValid = () => Boolean(unmaskCurrency2Float(this.state.value) > 0);
  handleSubmit = () => {
    const { selectedCard, user, apiStatus, request, history } = this.props;
    const { value } = this.state;
    if (!this.isValid()) this.setState({ error: 'Valor inválido' });
    else if (!apiStatus.isFetching) {
      request(value, selectedCard, user, history);
    }
  }
  render() {
    const { visible, selectedCard, onHide, user, apiStatus } = this.props;
    const { value, error } = this.state;
    const { id: userId, name } = user || {};
    return (
      <div>
        <DialogContainer
          id="confirm-payment"
          visible={visible}
          onHide={onHide}
          title={!name
            ? 'Nenhum usuário foi selecionado'
            : <div>
              Pagamento para <span className="md-text--theme-secondary">{name}</span>
            </div>}
          actions={[
            <Button
              raised
              className="button--primary dialog-button--only-one"
              onClick={this.handleSubmit}
            >{apiStatus.isFetching ? 'PAGANDO...' : 'PAGAR'}</Button>,
          ]}
        >
          {user && <div className="flexbox-center--column" style={{ paddingTop: '24px' }} >
            <UserTag user={user} />
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
            {selectedCard && selectedCard.cardNumber && selectedCard.cardNumber.slice
              ? <Link
                to={{ pathname: routes.SELECT_CARD, state: { userId } }}
                className="flexbox-center"
              >
                <FontIcon className="primary-color" style={{ marginRight: '12px' }}>credit_card</FontIcon>
                <div>
                  <p className="primary-color" style={{ marginBottom: '0' }}>Forma de pagamento:</p>
                  <span
                    className="primary-color"
                    style={{ fontWeight: 'bold' }}
                  >Cartão de Crédito com final {selectedCard.cardNumber.slice(-4)}</span>
                </div>
              </Link>
              : <li className="flexbox-center">
                <FontIcon className="error" style={{ marginRight: '12px' }}>error</FontIcon>
                <div>
                  <p className="error" style={{ marginBottom: '0' }}>Nenhum cartão de crédito cadastrado.</p>
                  <Link
                    to={{ pathname: routes.REGISTER_CARD, state: { userId } }}
                    className="error"
                    style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                  >Cadastrar agora.</Link>
                </div>
              </li>
            }
          </div>}
          {apiStatus.isFetching && <CircularProgress centered id="paying" />}
        </DialogContainer>
      </div>
    );
  }
}
