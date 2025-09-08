import { ɵStoreOptions } from '@ngxs/store/internals';

import { StateAppModel } from './app.state.model';

export const StateAppOptions: ɵStoreOptions<StateAppModel> = {
  name: 'app2',

  defaults: {
    home: true,
    apps: {},
    loading: false,
    stateName: 'init',
    mediaChanges: [],
  },
};
