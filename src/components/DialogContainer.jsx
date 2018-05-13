import React from 'react';
import cn from 'classnames';
import { Button, DialogContainer as DialogContainerMD, Toolbar } from 'react-md';

export default class DialogContainer extends React.PureComponent {
  render() {
    const filteredProps = { ...this.props };
    delete filteredProps.title;
    return (
      <div>
        <DialogContainerMD
          {...filteredProps}
          aria-label={this.props.id}
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
          <section className="dialog__content" >
            {this.props.children}
          </section>
        </DialogContainerMD>
      </div>
    );
  }
}
