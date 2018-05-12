import React from 'react';
import { List, ListItem, Avatar } from 'react-md';

export default ({ user: { id, name, img, username } }) => (
  <List>
    <ListItem
      key={id}
      className="list-item--user-tag"
      primaryText={name}
      secondaryText={<span>{`id: ${id}`}&ensp;&ensp;{username}</span>}
      leftAvatar={<Avatar src={img} className="avatar" />}
    />
  </List>
);
