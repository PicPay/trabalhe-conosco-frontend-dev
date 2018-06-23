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
    flagcard: '',
    nmbCard: '',
    name: '',
    validate: '',
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
    let flagcard = document.getElementById("flagcard").value;
    let nmbCard = document.getElementById("nmbCard").value;
    let name = document.getElementById("name").value;
    let validate = document.getElementById("validate").value;
    let ccv = document.getElementById("ccv").value;
    let cep = document.getElementById("cep").value;
    let obj = {
      flagcard,
      nmbCard,
      name,
      validate,
      ccv,
      cep,
    };

    localStorage.setItem('obj', obj);

    console.log(localStorage.obj);

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
                  id="flagcard"
                  name="flagcard"
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={this.state.flagcard}
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
                <InputLabel htmlFor="nmb-card">Número do cartão</InputLabel>
                <NumberFormat
                  id="nmbCard"
                  name="nmbCard"
                  customInput={Input}
                  format="#### #### #### ####"
                  mask="_"
                  value={this.state.nmbCard}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="nmb-card">Validade (mm/aaaa)</InputLabel>
                <NumberFormat
                  id="validate"
                  name="validate"
                  customInput={Input}
                  format="##/####"
                  mask="_"
                  value={this.state.vld}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl className="container-input">
                <InputLabel htmlFor="ccv-card">Código de segurança</InputLabel>
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

              <button className="btn-action-user" onClick={this.handleRegistration}>
                Cadastrar
              </button>


            </form>



        </div>
      </div>
    )
  }
}

export default CardRegistration;
