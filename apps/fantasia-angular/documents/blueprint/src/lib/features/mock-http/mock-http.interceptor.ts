import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MockHttpRoute } from './mock-http-route.interface';
import { MOCK_HTTP_ROUTES } from './mock-http-routes.const';
import { RequestMethod } from './request-method.enum';
import { MockHttpRouteParam } from './mock-http-route-param.interface';

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const method: RequestMethod = request.method as RequestMethod;
    const url: string = this.stripUrlPrefix(request.url);
    const urlWithParams: string = this.stripUrlPrefix(request.urlWithParams);
    const methodMock: Record<string, MockHttpRoute> = MOCK_HTTP_ROUTES[method];
    const mock: MockHttpRoute =
      methodMock == null
        ? null
        : methodMock[url] == null
        ? methodMock[urlWithParams]
        : methodMock[url];
    const prefix: string = '(MOCK)';

    console.log(`${prefix} --START--`);
    console.log(url);
    console.log(`${prefix} URL: ${urlWithParams}`);
    console.log(`${prefix} Request Method: ${method}`);

    const requestBody: any = request.body;

    if (requestBody != null) {
      console.log(`${prefix} REQUEST BODY:`);
      console.log(requestBody);
    }

    if (mock) {
      const responseFromParams: any = this.getResponseFromParams(
        mock,
        urlWithParams
      );
      const response: any = this.getResponseWithPaging(
        mock,
        responseFromParams,
        request
      );

      if (response != null) {
        console.log(`${prefix} RESPONSE BODY:`);
        console.log(response);
      }

      console.log(`${prefix} --END--`);
      console.log('');

      return of(new HttpResponse({ status: 200, body: response }));
    }

    console.log(`${prefix} NO MOCK FOUND. USING HTTP: ${url}`);
    console.log(`${prefix} --END--`);
    console.log('');

    return next.handle(request);
  }

  private stripUrlPrefix(url: string): string {
    if (url.match(/^http/) != null) {
      const urlParts: Array<string> = url.split('/');

      urlParts.splice(0, 3);

      url = urlParts.join('/');
    }

    return url;
  }

  private getResponseFromParams(
    mock: MockHttpRoute,
    urlWithParams: string
  ): any {
    const params: Array<MockHttpRouteParam> =
      mock.params == null ? [] : mock.params;

    const paramsMatch: MockHttpRouteParam = params
      .filter((param: MockHttpRouteParam) => param.matchers.length > 0)
      .find(
        (param: MockHttpRouteParam) =>
          param.matchers.findIndex((matcher: Record<string, any>) =>
            Object.keys(matcher).reduce(
              (matched: true, key: string) =>
                matched && urlWithParams.includes(`${key}=${matcher[key]}`),
              true
            )
          ) >= 0
      );

    return CoreUtil.clone<any>(
      paramsMatch == null ? mock.data : paramsMatch.data
    );
  }

  private getResponseWithPaging(
    mock: MockHttpRoute,
    response: any,
    request: HttpRequest<any>
  ): any {
    if (
      request.params.get('page') != null &&
      request.params.get('size') != null
    ) {
      const page: number = parseInt(request.params.get('page'), 10);
      const size: number = parseInt(request.params.get('size'), 10);
      const pageBegin: number = page * size;
      const pageEnd: number = pageBegin + size;

      response = response.slice(pageBegin, pageEnd);

      const totalElements: number = mock.data.length;
      const totalPages: number = Math.ceil(totalElements / size);
      const numberOfElements: number = response.length;

      response = {
        ...MOCK_PAGE_TEMPLATE,
        content: response,

        totalElements,
        totalPages,
        size,
        numberOfElements
      };
    }

    return response;
  }
}
