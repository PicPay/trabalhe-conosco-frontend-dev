import React, { Component } from 'react'
import TopBar from './TopBar'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';

class CardRegistration extends Component{

  state = {
    cardFlag: '',
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cep: '',
    errorCardFlag:'',
    errorName: '',
    errorCardNumber: '',
    errorExpirationDate: '',
    errorCvv: '',
    errorCep: '',
    open: false,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ errorCardFlag:'',errorName: '',errorCardNumber: '',errorExpirationDate: '',errorCvv: '',errorCep: '',});
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  /* Recupera os dados do cartão cadastrado */
  handleRegistration = (e) => {
    e.preventDefault();
    let cardRegister = {
      cardFlag: this.state.cardFlag,
      name: this.state.name,
      cardNumber: this.state.cardNumber,
      expirationDate: this.state.expirationDate,
      cvv: this.state.cvv,
      cep: this.state.cep,
    }

    /* Verifica se o input está em branco */
    if (this.state.cardFlag === ''){
      this.setState({errorCardFlag: 'Selecione a bandeira do cartão.'});
    } if (this.state.name === ''){
      this.setState({errorName: 'Digite o nome escrito no cartão'});
    } if (this.state.cardNumber === ''){
      this.setState({errorCardNumber: 'Digite o número do cartão'});
    } if (this.state.expirationDate === ''){
      this.setState({errorExpirationDate: 'Digite a validade do cartão'});
    } if (this.state.cvv === ''){
      this.setState({errorCvv: 'Digite o código de segurança'});
    } if (this.state.cep === ''){
      this.setState({errorCep: 'Digite o CEP do endereço da fatura'});
    } else {
      /* Inicia o contador de cartão */
      if ( localStorage.cardCount === undefined ) {
        localStorage.setItem('cardCount', 0)
      }

      /* Adiciona +1 para o contador */
      let cardSize = parseInt(localStorage.cardCount, 16) + 1;
      commitToStorage(cardSize,cardRegister);

      /* Adiciona o cartão no storage, com o valor do contador sendo key */
      function commitToStorage(objectCount,newCard) {
        let item = 'card' + objectCount;
        localStorage.setItem('cardCount', objectCount);
        localStorage.setItem(item, JSON.stringify(newCard));
        localStorage.setItem('selectedCard', JSON.stringify(newCard));
      }

      this.props.onPaymentContact(this.props.contact)
    }
  };

  render(){
    return(
      <div className="backdrop">
        <div className="modal-box modal-card">
          <TopBar text={"Cadastro Cartão de Crédito"} CloseModal={this.props.onCloseModal}/>

            <form autoComplete="off" className="container-form">
              <FormControl className="container-input">
                <InputLabel>Selecione a bandeira</InputLabel>
                <Select
                  id="cardFlag"
                  name="cardFlag"
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={this.state.cardFlag}
                  onChange={this.handleChange}
                >
                  <MenuItem value={'Visa'}>Visa</MenuItem>
                  <MenuItem value={'Mastercard'}>Mastercard</MenuItem>
                </Select>
                <p className="erro-msg">{this.state.errorCardFlag}</p>
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="name">Nome escrito no cartão</InputLabel>
                <Input id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                <p className="erro-msg">{this.state.errorName}</p>
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="cardNumber">Número do cartão</InputLabel>
                <NumberFormat
                  id="cardNumber"
                  name="cardNumber"
                  customInput={Input}
                  format="################"
                  type='tel'
                  value={this.state.cardNumber}
                  onChange={this.handleChange}
                />
                <p className="erro-msg">{this.state.errorCardNumber}</p>
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="expirationDate">Validade (mm/aaaa)</InputLabel>
                <NumberFormat
                  id="expirationDate"
                  name="expirationDate"
                  customInput={Input}
                  format="##/####"
                  type='tel'
                  value={this.state.expirationDate}
                  onChange={this.handleChange}
                />
                <p className="erro-msg">{this.state.errorExpirationDate}</p>
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="cvv">Código de segurança</InputLabel>
                <NumberFormat
                  id="cvv"
                  name="cvv"
                  customInput={Input}
                  format="###"
                  type='tel'
                  value={this.state.cvv}
                  onChange={this.handleChange}
                />
                <p className="erro-msg">{this.state.errorCvv}</p>
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="cep">CEP do endereço da fatura</InputLabel>
                <NumberFormat
                  id="cep"
                  name="cep"
                  customInput={Input}
                  format="#####-###"
                  type='tel'
                  value={this.state.cep}
                  onChange={this.handleChange}
                />
                <p className="erro-msg">{this.state.errorCep}</p>
              </FormControl>

              <button className="btn-action-user" onClick={this.handleRegistration} >
                Cadastrar
              </button>

            </form>

        </div>
      </div>
    )
  }
}

export default CardRegistration;
