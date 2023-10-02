import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/enviroments/enviroment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiUrl;
  private baseUrl = `${this.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  authUser(data:any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/auth`,data);
  }

  registerUser(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}`,data);
  }

}
