import { Group } from '@/api';
import { changeModal } from '@/state/ModalSlice';
import {
  Avatar,
  Button,
  Headline,
  Separator,
  SimpleCell,
  Spacing,
  Title,
} from '@vkontakte/vkui';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

interface ListItemProps {
  group: Group;
  spacingAfter: boolean;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { group, spacingAfter } = props;
  const dispatch = useDispatch();

  return (
    <>
      <Spacing size={16} />
      <SimpleCell
        before={
          <Avatar
            size={100}
            src="#"
            gradientColor={group.avatar_color ? 'custom' : 'blue'}
            style={{ backgroundColor: group.avatar_color ?? 'none' }}
            initials={group.avatar_color ? undefined : group.name[0]}
          ></Avatar>
        }
        subtitle={
          <Headline level="2">{`${
            group.closed ? 'Закрытая' : 'Открытая'
          } группа`}</Headline>
        }
        extraSubtitle={
          <Headline level="2">{`${group.members_count} подписчиков`}</Headline>
        }
        after={
          group.friends && (
            <Button
              size="m"
              onClick={() => {
                dispatch(changeModal(group.id.toString()));
              }}
            >{`${group.friends.length} друзей`}</Button>
          )
        }
      >
        <Title level="2">{group.name}</Title>
      </SimpleCell>
      <Spacing size={16} />
      {spacingAfter && <Separator />}
    </>
  );
};
