import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/common-services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorHttpService {

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newReq = req.clone();


      let url ;


      url = environment.apiUrl + req.url;
     

      // if(req.url.indexOf(environment.axonatorX1Url) !== -1)
      // {
      //   newReq = req.clone({
      //       url:url,
      //       withCredentials: true,
      //       headers: req.headers.set('X-CSRFTOKEN', this.cookieService.get(environment.webCsrfCookieName))
      //   });
      // }
      // else{
        newReq = req.clone({
          url:url,
        });
      // }
    // Response
            newReq = req.clone({
              url:url,
              headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
            });
    return next.handle(newReq).pipe(
      catchError((error) => {

          // Catch "401 Unauthorized" responses
          if ( error instanceof HttpErrorResponse && error.status === 401 )
          {


              // Reload the app
              location.reload();
          }

          return throwError(error);
      })
  );

  }
}
