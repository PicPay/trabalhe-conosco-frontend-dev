/* eslint react/no-did-update-set-state: 0 */
import React from 'react';
import { Button, SelectField, TextField } from 'react-md';
import DialogContainer from './DialogContainer';

const initialState = {
  cardFLag: {
    value: '',
    error: '',
  },
  name: {
    value: '',
    error: '',
  },
  cardNumber: {
    value: '',
    error: '',
  },
  expirationDate: {
    value: '',
    error: '',
  },
  cvvNumber: {
    value: '',
    error: '',
  },
  CEP: {
    value: '',
    error: '',
  },
};

export default class RegisterCardDialog extends React.Component {
  state = initialState;
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) this.setState(initialState);
  }
  handleChange = field => value => this.setState({ [field]: { value, error: '' } });
  handleChangeName = (value) => {
    const filteredValue = value.replace(/\d/g, '');
    this.setState({ name: { value: filteredValue.toUpperCase() } });
  }
  handleChangeCardNumber = (value) => {
    const filteredValue = value.replace(/[^\d]/g, '').slice(0, 16);
    this.setState({ cardNumber: { value: filteredValue } });
  }
  handleChangeCvvNumber = (value) => {
    const filteredValue = value.replace(/[^\d]/g, '').slice(0, 3);
    this.setState({ cvvNumber: { value: filteredValue } });
  }
  handleChangeCEP = (value) => {
    const filteredValue = value.replace(/[^\d]/g, '').slice(0, 8);
    this.setState({ CEP: { value: filteredValue } });
  }
  handleChangeExpirationDate = (value) => {
    const filteredValue = value.replace(/[^\d]/g, '').slice(0, 6);
    const length = filteredValue.length;
    let finalValue;
    if (length > 1) {
      finalValue = `${filteredValue.slice(0, 2)}/${filteredValue.slice(2)}`;
    } else {
      finalValue = filteredValue;
    }
    this.setState({ expirationDate: { value: finalValue } });
  }
  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { cardFLag, name, cardNumber, expirationDate, cvvNumber, CEP } = this.state;
    let valid = true;
    console.log(cardFLag, name, cardNumber, expirationDate, cvvNumber, CEP)
    if (!cardFLag.value) {
      valid = false;
      this.setState({ cardFLag: { ...cardFLag, error: 'Selecionar bandeira' } });
    }
    if (!name.value) {
      valid = false;
      this.setState({ name: { ...name, error: 'Informar nome' } });
    } 
    if (cardNumber.value.length !== 16) {
      valid = false;
      this.setState({ cardNumber: { ...cardNumber, error: 'Número de cartão inválido' } });
    } 
    if (expirationDate.value.length !== 7) {
      valid = false;
      this.setState({ expirationDate: { ...expirationDate, error: 'Data inválida' } });
    } 
    if (cvvNumber.value.length !== 3) {
      valid = false;
      this.setState({ cvvNumber: { ...cvvNumber, error: 'Código inválido' } });
    } 
    if (CEP.value.length !== 8) {
      valid = false;
      this.setState({ CEP: { ...CEP, error: 'CEP inválido' } });
    }
    if (valid) {
      onSubmit(cardFLag.value, name.value, cardNumber.value, expirationDate.value, cvvNumber.value, CEP.value);
    }
  }
  render() {
    const { visible, onHide } = this.props;
    const { cardFLag, name, cardNumber, expirationDate, cvvNumber, CEP } = this.state;
    return (
      <div>
        <DialogContainer
          id="register-card"
          visible={visible}
          onHide={onHide}
          title="Cadastrar Cartão de Crédito"
          actions={[
            <Button
              raised
              className="button--primary dialog-button--only-one"
              onClick={this.handleSubmit}
            >CADASTRAR</Button>,
          ]}
        >
          <div className="flexbox-center--column" style={{ paddingTop: '24px' }}>
            <SelectField
              id="card-flag"
              placeholder="Selecione a bandeira"
              menuItems={[
                { label: 'VISA', value: 'visa' },
                { label: 'MasterCard', value: 'mastercard' },
              ]}
              value={cardFLag.value}
              onChange={this.handleChange('cardFLag')}
              error={Boolean(cardFLag.error)}
              errorText={cardFLag.error}
              fullWidth
            />
            <TextField
              id="name"
              label="Nome escrito no cartão"
              lineDirection="center"
              value={name.value}
              onChange={this.handleChangeName}
              error={Boolean(name.error)}
              errorText={name.error}
            />
            <TextField
              id="card-number"
              label="Número do cartão"
              lineDirection="center"
              value={cardNumber.value}
              onChange={this.handleChangeCardNumber}
              error={Boolean(cardNumber.error)}
              errorText={cardNumber.error}
            />
            <TextField
              id="expiration-date"
              label="Validade (mm/aaaa)"
              lineDirection="center"
              value={expirationDate.value}
              onChange={this.handleChangeExpirationDate}
              error={Boolean(expirationDate.error)}
              errorText={expirationDate.error}
            />
            <TextField
              id="cvv-number"
              label="Código de segurança"
              lineDirection="center"
              value={cvvNumber.value}
              onChange={this.handleChangeCvvNumber}
              error={Boolean(cvvNumber.error)}
              errorText={cvvNumber.error}
            />
            <TextField
              id="cep-code"
              label="CEP do endereço da fatura"
              lineDirection="center"
              value={CEP.value}
              onChange={this.handleChangeCEP}
              error={Boolean(CEP.error)}
              errorText={CEP.error}
            />
          </div>
        </DialogContainer>
      </div>
    );
  }
}
