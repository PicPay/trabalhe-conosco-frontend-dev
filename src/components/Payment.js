import React, { Component } from 'react'
import TopBar from'./TopBar';

class Payment extends Component{

  render(){
    const { contact } = this.props

    return(

      <div className="backdrop">
        <div className="modal-box">

          <TopBar name={contact.name} CloseModal={this.props.onCloseModal}/>



        </div>
      </div>
    )
  }
}

export default Payment;
