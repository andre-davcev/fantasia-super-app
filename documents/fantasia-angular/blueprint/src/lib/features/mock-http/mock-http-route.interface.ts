import { MockHttpRouteParam } from './mock-http-route-param.interface';

export interface MockHttpRoute {
  data: any;
  params?: Array<MockHttpRouteParam>;
}
