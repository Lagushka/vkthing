'use client';

import { store } from '@/state/store';
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Provider } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';

type AppWrapperProps = {
  children: ReactNode;
};

export const AppWrapper: FC<PropsWithChildren<AppWrapperProps>> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <AdaptivityProvider>
        <AppRoot>{children}</AppRoot>
      </AdaptivityProvider>
    </Provider>
  );
};
