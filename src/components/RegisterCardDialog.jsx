import React from 'react';
import { Button, SelectField, TextField } from 'react-md';
import DialogContainer from './DialogContainer';

export default class SimpleListDialog extends React.Component {
  state = {
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
  }
  handleChangeName = (value) => {
    const filteredValue = value.replace(/\d/g, '');
    this.setState({ name: { value: filteredValue.toUpperCase() } });
  }
  handleChange = field => value => this.setState({ [field]: { value, error: '' } });
  render() {
    const { visible, onHide } = this.props;
    const { name, cardFLag, cardNumber, expirationDate, cvvNumber, CEP } = this.state;
    return (
      <div>
        <DialogContainer
          id="register-card"
          visible={visible}
          onHide={onHide}
          title="Cadastrar Cartão de Crédito"
          actions={[
            <Button raised className="button--primary dialog-button--only-one" >CADASTRAR</Button>,
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
              onChange={this.handleChange('cardNumber')}
              error={Boolean(cardNumber.error)}
              errorText={cardNumber.error}
            />
            <TextField
              id="expiration-date"
              label="Validade (mm/aaaa)"
              lineDirection="center"
              value={expirationDate.value}
              onChange={this.handleChange('expirationDate')}
              error={Boolean(expirationDate.error)}
              errorText={expirationDate.error}
            />
            <TextField
              id="cvv-number"
              label="Código de segurança"
              lineDirection="center"
              value={cvvNumber.value}
              onChange={this.handleChange('cvvNumber')}
              error={Boolean(cvvNumber.error)}
              errorText={cvvNumber.error}
            />
            <TextField
              id="cep-code"
              label="CEP do endereço da fatura"
              lineDirection="center"
              value={CEP.value}
              onChange={this.handleChange('CEP')}
              error={Boolean(CEP.error)}
              errorText={CEP.error}
            />
          </div>
        </DialogContainer>
      </div>
    );
  }
}
