'use client';

import { Group, fetchGroups } from '@/api';
import { Filters } from '@/components/filters/Filters';
import { List } from '@/components/list/List';
import { getColorsByGroups } from '@/state/FilterSlice';
import { getAll, setStatus } from '@/state/ListSlice';
import { changeModal } from '@/state/ModalSlice';
import { RootState } from '@/state/store';
import {
  Group as UIGroup,
  ModalPage,
  ModalRoot,
  Panel,
  PanelSpinner,
  SimpleCell,
  Spacing,
  SplitCol,
  SplitLayout,
  View,
} from '@vkontakte/vkui';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const activeModal = useSelector(
    (state: RootState) => state.modal.activeModal,
  );
  const { groups, status } = useSelector((state: RootState) => state.groups);
  const {
    closed: closedFilter,
    avatarColor: avatarColorFilter,
    hasFriends: hasFriendsFilter,
  } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchGroups();
        if (data.data) {
          dispatch(getAll(data.data));
          dispatch(getColorsByGroups(data.data));
          dispatch(setStatus('done'));
        } else {
          dispatch(setStatus('error'));
        }
      } catch (err) {
        console.error(err);
        dispatch(setStatus('error'));
      }
    }

    getData();
  }, [dispatch]);

  const modalRoot = (
    <ModalRoot activeModal={activeModal}>
      {groups.map((group) => (
        <ModalPage
          key={group.id}
          id={group.id.toString()}
          onClose={() => dispatch(changeModal(null))}
        >
          <UIGroup>
            {group.friends?.map((friend) => (
              <SimpleCell
                key={null}
              >{`${friend.first_name} ${friend.last_name}`}</SimpleCell>
            ))}
          </UIGroup>
        </ModalPage>
      ))}
    </ModalRoot>
  );

  const filteredGroups = useMemo(
    () =>
      groups.filter((group: Group) => {
        if (
          closedFilter.currentValue !== null &&
          closedFilter.currentValue !== group.closed
        ) {
          return false;
        }
        if (
          avatarColorFilter.currentValue !== null &&
          avatarColorFilter.currentValue !== group.avatar_color
        ) {
          return false;
        }
        if (
          hasFriendsFilter.currentValue !== null &&
          hasFriendsFilter.currentValue !== Boolean(group.friends)
        ) {
          return false;
        }

        return true;
      }),
    [
      avatarColorFilter.currentValue,
      closedFilter.currentValue,
      groups,
      hasFriendsFilter.currentValue,
    ],
  );

  return (
    <SplitLayout modal={modalRoot}>
      <Filters />
      <SplitCol autoSpaced>
        <Spacing size={24} />
        <View activePanel="main">
          <Panel id="main">
            {status === 'loading' ? (
              <PanelSpinner />
            ) : (
              <List groups={filteredGroups} />
            )}
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}
