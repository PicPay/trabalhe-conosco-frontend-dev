/* eslint react/no-did-update-set-state: 0 */
import React from 'react';
import { FontIcon, List, ListItem, Button } from 'react-md';
import cn from 'classnames';
import DialogContainer from './DialogContainer';

export default class SelectCardDialog extends React.PureComponent {
  render() {
    const { visible, onHide, registerNewCard, cards, selectedCardNumber, selectCard, onSelectSubmit } = this.props;
    return (
      <div>
        <DialogContainer
          id="confirm-payment"
          visible={visible}
          onHide={onHide}
          title="Selecionar Cartão de Crédito"         
          actions={[
            <Button
              raised
              className="button--primary dialog-button--only-one"
              onClick={onSelectSubmit}
            >SELECIONAR</Button>,
          ]}
        >
          <div className="flexbox-center--column" style={{ paddingTop: '24px' }}>
            <h3 className="primary-color">Cartões Cadastrados</h3>
            <List>
              {cards.map(({ cardNumber }) => (
                <ListItem
                  key={cardNumber}
                  className={cn('list-item--card', { 'list-item--card--selected': selectedCardNumber === cardNumber })}
                  primaryText={cardNumber}
                  leftIcon={<FontIcon primary>credit_card</FontIcon>}
                  rightIcon={selectedCardNumber === cardNumber ? <FontIcon secondary>check</FontIcon> : undefined}
                  onClick={() => selectCard(cardNumber)}
                />
              ))}
              <ListItem
                className="list-item--card"
                primaryText="Cadastrar novo cartão"
                onClick={registerNewCard}
                leftIcon={<FontIcon primary>add</FontIcon>}
              />
            </List>
          </div>
        </DialogContainer>
      </div>
    );
  }
}
