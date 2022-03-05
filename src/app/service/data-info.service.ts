import { Data } from 'popper.js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { DataInfoDTO } from './../model/data-info.dto';

@Injectable({
  providedIn: 'root',
})
export class DataInfoService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  salvarDataInfo(dataInfo: DataInfoDTO): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + 'data', dataInfo);
  }

  adquirirDatas(): Observable<Array<DataInfoDTO>> {
    return this.httpClient.get<Array<DataInfoDTO>>(this.baseUrl + 'data');
  }
}
