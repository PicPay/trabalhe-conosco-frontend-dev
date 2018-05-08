import React from 'react';
import { Avatar, FontIcon, List, ListItem } from 'react-md';

export default ({ users }) => (
  <List className="list">
    {users.map(({ id, name, img, username }) => (
      <ListItem
        key={id}
        className="list-item"
        primaryText={name}
        secondaryText={<span>{`id: ${id}`}&ensp;&ensp;{username}</span>}
        leftAvatar={<Avatar src={img} className="avatar" />}
        rightIcon={
          <div className="flexbox-center">
            <div>PAGAR&ensp;</div><FontIcon >keyboard_arrow_right</FontIcon>
          </div>
        }
      />
    ))}
  </List>
);
