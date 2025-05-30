import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token= localStorage.getItem('authToken');
  const baseURL = 'https://web-production-0af9.up.railway.app/';
  if(token){
    req=req.clone({
      url: baseURL + req.url,
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  else
  {
    req=req.clone({
      url: baseURL + req.url
      
    });
  }
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      console.error('Error en la autenticación', error);
      return throwError(error);
    })
  );
};
