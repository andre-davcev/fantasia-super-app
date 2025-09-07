import { AppProperties } from '../../models';

import { ActionsApp } from './app.actions.enum';

export class ActionAppLoad { static readonly type = ActionsApp.Load; constructor(public payload: Array<AppProperties>) {} }
export class ActionAppNavToChild { static readonly type = ActionsApp.NavigateToChildApp; constructor(public payload: string) {} }
export class ActionAppNavToHome { static readonly type = ActionsApp.NavigateToHome; }
export class ActionAppWatchRouterEvents { static readonly type = ActionsApp.WatchRouterEvents; }
export class ActionAppWatchMediaBreakpoints { static readonly type = ActionsApp.WatchMediaBreakpoints; }
