import React from 'react';
import { Avatar, FontIcon, List, ListItem } from 'react-md';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

export default ({ users }) => (
  <List className="list">
    {users.map(({ id, name, img, username }) => (
      <ListItem
        key={id}
        className="list-item--main"
        primaryText={name}
        secondaryText={<span>{`id: ${id}`}&ensp;&ensp;{username}</span>}
        leftAvatar={<Avatar src={img} className="avatar" />}
        rightIcon={
          <Link className="flexbox-center" to={routes.CONFIRM_PAYMENT}>
            <div>PAGAR&ensp;</div><FontIcon >keyboard_arrow_right</FontIcon>
          </Link>
        }
      />
    ))}
  </List>
);
