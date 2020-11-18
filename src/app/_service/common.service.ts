import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // request header
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'charset': 'utf-8'
  });

  // header with token
  createAuthorizedHeader(headers: HttpHeaders) {
    return headers.append('Authorization', `Token ${localStorage.getItem('token')}`);
  }

  constructor() { }

  public handleError(error: Error | HttpErrorResponse) {

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        console.error('No internet connection!');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        console.error(`${error.status} - ${error.message}`);
      }
    } else {
      // Client Error
      console.error(error);
    }
    return throwError(error);
  }

  // get function params name
  getParams(func) {
    // String representaation of the function code 
    var str = func.toString();

    // Remove comments of the form /* ... */ 
    // Removing comments of the form // 
    // Remove body of the function { ... } 
    // removing '=>' if func is arrow function  
    str = str.replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/(.)*/g, '')
      .replace(/{[\s\S]*}/, '')
      .replace(/=>/g, '')
      .trim();
    // Start parameter names after first '(' 
    var start = str.indexOf("(") + 1;
    // End parameter names is just before last ')' 
    var end = str.length - 1;
    var result = str.substring(start, end).split(", ");
    var params = [];
    result.forEach(element => {
      // Removing any default value 
      element = element.replace(/=[\s\S]*/g, '').trim();
      if (element.length > 0)
        params.push(element);
    });
    return params;
  }
}
