import React, { Component } from 'react'

class TopBar extends Component{

  render(){

    return(
      <div className="top-bar-payment">
        <p className="text-top-bar">Pagamento para <span> {this.props.name} </span></p>
        <button className="btn-close-modal" onClick={ this.props.CloseModal }><div className="btn-x"></div></button>
      </div>
    )
  }
}

export default TopBar;
