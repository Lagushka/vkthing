'use client';

import { fetchGroups } from '@/api';
import { List } from '@/components/list/List';
import { getAll, setStatus } from '@/state/ListSlice';
import { changeModal } from '@/state/ModalSlice';
import { RootState } from '@/state/store';
import {
  Group,
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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const activeModal = useSelector(
    (state: RootState) => state.modal.activeModal,
  );
  const { groups, status } = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchGroups();
        if (data.data) {
          dispatch(getAll(data.data));
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
          <Group>
            {group.friends?.map((friend) => (
              <SimpleCell
                key={null}
              >{`${friend.first_name} ${friend.last_name}`}</SimpleCell>
            ))}
          </Group>
        </ModalPage>
      ))}
    </ModalRoot>
  );

  return (
    <SplitLayout modal={modalRoot}>
      <SplitCol autoSpaced>
        <View activePanel="main">
          <Panel id="main">
            <Spacing size={24} />
            {status === 'loading' ? <PanelSpinner /> : <List groups={groups} />}
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}
