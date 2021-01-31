import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../models/Service.model';
import { CommonService } from './common.service';
import { URLConstant } from './URLconstant';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = environment.apiUrl;
  versionField = 'v';

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private apiUrlConstant: URLConstant
  ) {}

  apiGet(urlKey, params?: Service, skipInterceptor = false) {
    let url;
    let options;
    if (params) {
      url = this.apiUrlConstant.getApiUrl(urlKey, params.dynamicUrlParams);

      options = this.appendParams(params.queryParams, skipInterceptor);
    } else {
      url = this.apiUrlConstant.getApiUrl(urlKey);
    }
    return this.http.get<any>(url, options);
  }

  apiPost(urlKey, params: Service, skipInterceptor = false) {
    let url;
    let options;
    if (params) {
      url = this.apiUrlConstant.getApiUrl(urlKey, params.dynamicUrlParams);

      options = this.appendParams(params.queryParams, skipInterceptor);
    } else {
      url = this.apiUrlConstant.getApiUrl(urlKey);
    }

    return this.http.post<any>(url, params.requestBody, options);
  }

  apiPostWithUpload(urlKey, params,skipInterceptor = false) {
    // url = this.apiUrlConstant.getApiUrl(urlKey);

    // return this.http.post<any>(url, formData);


    let url;
    let options;
    if (params) {
      url = this.apiUrlConstant.getApiUrl(urlKey, params.dynamicUrlParams);
      options = this.appendParams(params.queryParams, skipInterceptor);
    } else {
      url = this.apiUrlConstant.getApiUrl(urlKey);
    }
    return this.http.put<any>(url, params.requestBody, options);


  }

  apiPut(urlKey, params: Service, skipInterceptor = false) {
    let url;
    let options;
    if (params) {
      url = this.apiUrlConstant.getApiUrl(urlKey, params.dynamicUrlParams);
      options = this.appendParams(params.queryParams, skipInterceptor);
    } else {
      url = this.apiUrlConstant.getApiUrl(urlKey);
    }
    return this.http.put<any>(url, params.requestBody, options);
  }

  apiDelete(urlKey, params: Service, skipInterceptor = false) {
    let url;
    let options;
    if (params) {
      url = this.apiUrlConstant.getApiUrl(urlKey, params.dynamicUrlParams);
      options = this.appendParams(params.queryParams, skipInterceptor);
    } else {
      url = this.apiUrlConstant.getApiUrl(urlKey);
    }
    return this.http.delete<any>(url, options);
  }

  private appendParams(paramsObj, skipInterceptor) {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.append(key, paramsObj[key]);
      }
    }
    let headers = {};
    if(skipInterceptor){
      headers = new HttpHeaders({
        'content-type': 'application/json',
        'X-Skip-Interceptor' : ''
      });
    } else {
      headers = new HttpHeaders({
        'content-type': 'application/json'
      });
    }
    return Object.assign({}, { params: params, headers: headers });
  }
}
