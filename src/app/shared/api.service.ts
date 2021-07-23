/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
}
*/

import { Injectable } from '@angular/core';
import {  Case } from './case';
import { List } from './list';
import { User } from './user';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  endpoint = environment["API_URL"];
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  isAuthenticated =false;
  constructor(private http: HttpClient) {

   }

  registerUser(data: User): Observable<any> {
    let API_URL = `${this.endpoint}/user/register`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  loginUser(data: User): Observable<any> {
    let API_URL = `${this.endpoint}/user/login`;
    this.isAuthenticated = true;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
 

  getUserName() {
    const token = localStorage.getItem('token') ||"undefined";
    return this.http.get(`${this.endpoint}/user/username/`, {
      observe: 'body',
      params: new HttpParams().append('token', token)
    });
  }


  // Add  Case
  AddCase(data: Case): Observable<any> {
    let API_URL = `${this.endpoint}/case/add-case`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all cases
  GetCases() {
    return this.http.get(`${this.endpoint}/case`);
  }

  // Get Case
  GetCase(id: any): Observable<any> {
    let API_URL = `${this.endpoint}/case/read-case/${id}`;
    return this.http.get(API_URL);
  /*  return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      ) */
  }  

  // Update case
  UpdateCase(id: any, data: any): Observable<any> {
    let API_URL = `${this.endpoint}/case/update-case/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete case
  DeleteCase(id: any): Observable<any> {
    var API_URL = `${this.endpoint}/case/delete-case/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error-
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      msg = error.message;
      if(msg.indexOf('login')){
           this.isAuthenticated = false;
      }
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getCauseList(){
    let API_URL = `${this.endpoint}/case/list`;
    return this.http.get(API_URL);
  }

  activeCasesList(){
    let API_URL = `${this.endpoint}/case/active-cases`;
    return this.http.get(API_URL);
   
  }

}
