import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpMockRequestInterceptor } from './mock-http.interceptor';

describe('HttpMockRequestInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpMockRequestInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should return normal http response for non mocked urls', () => {
    const payload: Array<string> = ['test'];

    http
      .get('testing')
      .subscribe((response: any) => expect(response).toEqual(payload));

    httpMock.expectOne('testing').flush(payload);
  });
});
