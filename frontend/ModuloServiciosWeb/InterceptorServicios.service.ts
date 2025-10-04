import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ServiciviosVarios } from "./ServiciosBancosVarios.component";
import { SpinnerService } from "./spinner.service";
import { finalize, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  
  })
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private serviciosvarios: ServiciviosVarios,private spinnerService: SpinnerService) { }




  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show(); // Mostrar spinner al inicio de la solicitud
    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.hide(); // Ocultar spinner al finalizar la solicitud
      })
    );
  }
  
}