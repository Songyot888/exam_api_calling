import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { TripGetResponse } from '../../model/trip_get_response';

@Injectable({
  providedIn: 'root'
})
export class Trip {
  constructor(private constants : Constants, private http: HttpClient) {}

  public async getAllTrip() {
    const url = this.constants.API_ENDPOINT + 'trip';
    const response = await lastValueFrom(this.http.get<TripGetResponse[]>(url));
    return response ;
  }

  public async getTripByid(id: any) {
    const url = this.constants.API_ENDPOINT + 'trip/' + id;
    const response = await lastValueFrom(this.http.get<TripGetResponse>(url));
    return response ;
  }

  public async postAddTrip(body: any) {
    const url = this.constants.API_ENDPOINT + 'trip';
    const response = await lastValueFrom(this.http.post(url, body));
    return response ;
  }

  public async putAddTrip(id: any,body: any) {
    const url = this.constants.API_ENDPOINT + 'trip/' + id;
    const response = await lastValueFrom(this.http.put(url, body));
    return response ;
  }

  public async DaleteTrip(id: any) {
    const url = this.constants.API_ENDPOINT + 'trip/' + id;
    const response = await lastValueFrom(this.http.delete(url));
    return response ;
  }
  

  
}
