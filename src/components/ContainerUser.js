import React, { Component } from 'react'

class ContainerUser extends Component{

  render(){
    const { contact } = this.props

    return(

        <div>
          <div className="user-avatar" style={{
            backgroundImage: `url(${contact.img})`}}></div>
          <div className="user-info">
            <p className="user-title">{contact.name}</p>
            <div className="user-id">
              <p>id: {contact.id}</p>
              <p>{contact.username}</p>
            </div>
          </div>
        </div>
        
    )
  }
}

export default ContainerUser;
