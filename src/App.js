import React, { Component } from 'react';
import * as ContactsAPI from './utils/ContactsAPI'
import ContactList from'./components/ContactList';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {contacts:[]};
  }

  componentDidMount(){
    ContactsAPI.getAll().then((contacts) =>{
      this.setState({contacts})
    })
  }

  render() {
    return (
      <div>
        <ContactList contacts={this.state.contacts}/>
      </div>
    );
  }
}

export default App;
