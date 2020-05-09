import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();
        let N = API_CONFIG.baseUrl.length; // variavel buscando caracteres
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl; // variavel recebendo do primeiro caractres até *..

        if (localUser && requestToAPI) { // se existir localUser
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer ' + localUser.token)});
            return next.handle(authReq);

        }
        else {
            return next.handle(req)
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};