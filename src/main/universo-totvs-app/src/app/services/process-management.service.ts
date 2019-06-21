import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FluigOauthService } from './fluig-oauth.service';
import { ProductsConverterService } from './products-converter.service';
import { PurchaseRequest } from '../models/purchase-request.interface';
import { map } from 'rxjs/operators';
declare const WCMAPI: any;

@Injectable()
export class ProcessManagementService {

  private BASE_URL = `${window['WCMAPI'] ? WCMAPI.getServerURL() : ''}`;

  constructor(
    private http: HttpClient,
    private fluigOauthService: FluigOauthService,
    private productsConverter: ProductsConverterService
  ) {}

  public getProcessManagement(WKNumProcess): Observable<PurchaseRequest> {

    // tslint:disable-next-line:max-line-length
    const url = `${this.BASE_URL}/process-management/api/v2/requests?processInstanceId=${WKNumProcess}&page=1&pageSize=1000&expand=formFields`;

    const headers = this.getHeaders(url);

    const httpOptions = {
      headers: new HttpHeaders({
        ...headers
      })
    };

    return this.http.get(
      url,
      httpOptions
    ).pipe(map(res => {
      return this.productsConverter.convertToObject(
        res['items'][0]
      );
    }));
  }

  public moveProcessManagement(WKNumProcess, data): Observable<any> {

    const url = `${this.BASE_URL}/process-management/api/v2/requests/${WKNumProcess}/move`;

    const headers = this.getHeaders(url, 'POST');

    const httpOptions = {
      headers: new HttpHeaders({
        ...headers
      })
    };

    return this.http.post(
      url,
      data,
      httpOptions
    );
  }

  private getHeaders(url: string, method = 'GET') {
    return this.fluigOauthService.getOauthHeaders({
      url: url,
      method: method
    });
  }
}
