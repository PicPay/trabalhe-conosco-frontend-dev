import React from 'react';
import { Button, Divider, FontIcon, TextField } from 'react-md';
import DialogContainer from './DialogContainer';

export default class SimpleListDialog extends React.PureComponent {
  state = {
    name: {
      value: '',
      error: '',
    }
  }
  handleChangeName = (value) => {
    const filteredValue = value.replace(/\d/g, '');
    this.setState({ name: { value: filteredValue.toUpperCase() } });
  }
  render() {
    const { visible } = this.props;
    const { name } = this.state;
    return (
      <div>
        <DialogContainer
          id="register-card"
          visible={visible}
          onHide={this.hide}
          title="Cadastrar Cartão de Crédito"
          actions={[
            <Button raised className="button--primary dialog-button--only-one" >CADASTRAR</Button>,
          ]}
        >
          <div className="flexbox-center--column">
            <TextField
              id="name"
              label="Title"
              lineDirection="center"
              value={name.value}
              onChange={this.handleChangeName}
              error={Boolean(name.error)}
              errorText={name.error}
            />
          </div>
        </DialogContainer>
      </div>
    );
  }
}
