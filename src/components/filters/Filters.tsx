import {
  changeAvatarColor,
  changeClosedValue,
  changeHasFriends,
} from '@/state/FilterSlice';
import { RootState } from '@/state/store';
import { Group, Panel, Spacing, SplitCol, View } from '@vkontakte/vkui';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter } from './ui/Filter';

export const Filters: FC = () => {
  const {
    closed: closedFilter,
    avatarColor: avatarColorFilter,
    hasFriends: hasFriendsFilter,
  } = useSelector((state: RootState) => state.filters);
  const status = useSelector((state: RootState) => state.groups.status);

  const dispatch = useDispatch();

  return (
    <SplitCol autoSpaced>
      <Spacing size={24} />
      <View activePanel="filter">
        <Panel id="filter">
          <Group>
            <Filter
              id="closeness-select"
              placeholder="Закрытость"
              options={closedFilter.values.map((pair) => ({
                label: pair.label,
                value: String(pair.value),
              }))}
              onChange={(event) => {
                const value = event.target.value;
                dispatch(
                  changeClosedValue(
                    value === 'true' ? true : value === 'false' ? false : null,
                  ),
                );
              }}
            />
            <Filter
              id="avatar-select"
              fetching={status === 'loading'}
              placeholder="Цвет аватарки"
              options={avatarColorFilter.values.map((value) => ({
                label: value,
                value: value,
              }))}
              onChange={(event) => {
                const value = event.target.value;
                dispatch(changeAvatarColor(value));
              }}
            />
            <Filter
              id="friends-select"
              placeholder="Есть друзья"
              options={hasFriendsFilter.values.map((pair) => ({
                label: pair.label,
                value: String(pair.value),
              }))}
              onChange={(event) => {
                const value = event.target.value;
                dispatch(
                  changeHasFriends(
                    value === 'true' ? true : value === 'false' ? false : null,
                  ),
                );
              }}
            />
          </Group>
        </Panel>
      </View>
    </SplitCol>
  );
};
