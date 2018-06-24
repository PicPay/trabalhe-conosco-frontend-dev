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
    cardNumber: '',
    name: '',
    expirationDate: '',
    ccv: '',
    cep: '',
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleRegistration = (e) => {
    e.preventDefault();
    let cardFlag = document.getElementById("cardFlag").value;
    let cardNumber = document.getElementById("cardNumber").value;
    let name = document.getElementById("name").value;
    let expirationDate = document.getElementById("expirationDate").value;
    let ccv = document.getElementById("ccv").value;
    let cep = document.getElementById("cep").value;
    let cardRegister = {
      cardFlag: cardFlag,
      cardNumber: cardNumber,
      name: name,
      expirationDate: expirationDate,
      ccv: ccv,
      cep: cep,
    };

    if ( localStorage.cardCount === undefined ) {
      localStorage.setItem('cardCount', 0)
    }

    let cardSize = parseInt(localStorage.cardCount) + 1;
    commitToStorage(cardSize,cardRegister);

    function commitToStorage(objectCount,newObject) {
      let item = 'card' + objectCount;
      localStorage.setItem('cardCount', objectCount);

      localStorage.setItem(item, JSON.stringify(newObject));
    }

    if ( localStorage.cardCount === 1 ){
      this.props.onPaymentContact(this.props.contact)
    } else {
      this.props.onSelectCardModal(this.props.contact)
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
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="name">Nome escrito no cartão</InputLabel>
                <Input id="name" name="name" value={this.state.name} onChange={this.handleChange} />
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="cardNumber">Número do cartão</InputLabel>
                <NumberFormat
                  id="cardNumber"
                  name="cardNumber"
                  customInput={Input}
                  format="#### #### #### ####"
                  mask="_"
                  value={this.state.cardNumber}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="expirationDate">Validade (mm/aaaa)</InputLabel>
                <NumberFormat
                  id="expirationDate"
                  name="expirationDate"
                  customInput={Input}
                  format="##/####"
                  mask="_"
                  value={this.state.expirationDate}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="ccv">Código de segurança</InputLabel>
                <NumberFormat
                  id="ccv"
                  name="ccv"
                  customInput={Input}
                  format="###"
                  mask="_"
                  value={this.state.ccv}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="cep">CEP do endereço da fatura</InputLabel>
                <NumberFormat
                  id="cep"
                  name="cep"
                  customInput={Input}
                  format="#####-###"
                  mask="_"
                  value={this.state.cep}
                  onChange={this.handleChange}
                />
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
