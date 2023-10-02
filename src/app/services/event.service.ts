import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/enviroments/enviroment'
import {EventI} from "../interfaces/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl: string = environment.apiUrl;
  private baseUrl = `${this.apiUrl}/event`;

  constructor(private http: HttpClient) {
  }

  getAllEvent(): Observable<any> {
    return this.http.get<EventI[]>(`${this.baseUrl}`);
  }

  addEvent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`,data);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  finishEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/finish/${id}`)
  }

  subscribeEvent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/participant/`,data);
  }

  unSubscribeEvent(data: any, id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/participant/${id}`,data);
  }

  getAllEventParticipant(id:number): Observable<any> {
    return this.http.get<Object>(`${this.baseUrl}/participant/${id}`);
  }

}
