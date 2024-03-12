import { GetGroupsResponse } from './api.types';

import groups from './mocks/groups.json';

type FetchGroups = () => Promise<GetGroupsResponse>;

export const fetchGroups: FetchGroups = async () => {
  const returnData: GetGroupsResponse = {
    result: 1,
    data: groups,
  };

  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(returnData);
    }, 1000);
  }).then((data) => data as GetGroupsResponse);

  return result;
};
