import React, { Component } from 'react'
import TopBar from './TopBar';
import ContainerUser from './ContainerUser'

class Payment extends Component{

  render(){
    const { contact } = this.props

    return(

      <div className="backdrop">
        <div className="modal-box">

          <TopBar name={contact.name} CloseModal={this.props.onCloseModal}/>

          <div className="container-user">
            <ContainerUser contact={contact} />
          </div>

          <div className="input-money">
          </div>

        </div>
      </div>
    )
  }
}

export default Payment;
