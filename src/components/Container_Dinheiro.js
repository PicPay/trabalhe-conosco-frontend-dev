import React, {Component} from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';

const currencyConfig = {
    locale: "pt-BR",
    formats: {
    number: {
    BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        },
      },
    },
};


class ContainerDinheiro extends Component {

  render() {
    return (
          <div className="containerDinheiro">
            <IntlCurrencyInput currency="BRL" config={currencyConfig} className="R-000" onChange={this.props.handleChange}/>
          </div>
      );
  }
}

export default ContainerDinheiro;
