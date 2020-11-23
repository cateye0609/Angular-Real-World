import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
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
}
