import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { environment as ENV } from '../../environments/environment';
import { Client } from '../models/client';
import { Credit } from '../models/credit';


@Injectable()
export class CreditRequestService {

  public servicesClientURL = `${ENV.route_api}/client`;
  public servicesCreditURL = `${ENV.route_api}/credit`;

  constructor(private http: HttpClient) { }

  public getClient(typeDocument: number, numberDocument: number) {
    let url = `${this.servicesClientURL}?`;
    url += `${typeDocument ? `typeDocument=${typeDocument}` : ''}`;
    url += `${numberDocument ? `&numberDocument=${numberDocument}` : ''}`;

    return this.http.get(url);
  }

  public addClient(client:Client){
    let url = `${this.servicesClientURL}`;

    return this.http.post(url, client);
  }

  public addCredit(credit:Credit){
    let url = `${this.servicesCreditURL}`;

    return this.http.post(url, credit);
  }

}
