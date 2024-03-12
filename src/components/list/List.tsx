'use client';

import { Group as UIGroup } from '@vkontakte/vkui';
import { FC } from 'react';
import { ListItem } from './ui/list-item/ListItem';
import { Group } from '@/api';

interface ListProps {
  groups: Group[];
}

export const List: FC<ListProps> = (props) => {
  const { groups } = props;

  return (
    <UIGroup>
      {groups.map((group, index) => (
        <ListItem
          group={group}
          key={group.id}
          spacingAfter={index < groups.length - 1}
        />
      ))}
    </UIGroup>
  );
};
