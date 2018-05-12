import React from 'react';
import cn from 'classnames';
import { Button, DialogContainer, Toolbar } from 'react-md';

export default class SimpleListDialog extends React.PureComponent {
  render() {
    const filteredProps = { ...this.props };
    delete filteredProps.title;
    return (
      <div>
        <DialogContainer
          {...filteredProps}
          aria-label={this.props.title}
          dialogClassName={cn('dialog', this.props.dialogClassName)}
          footerClassName={cn('dialog__footer', this.props.footerClassName)}
        >
          <Toolbar
            className="dialog__header"
            colored
            title={this.props.title}
            titleId={this.props.id}
            actions={<Button icon onClick={this.props.onHide}>close</Button>}
          />
          {this.props.children}
        </DialogContainer>
      </div>
    );
  }
}
