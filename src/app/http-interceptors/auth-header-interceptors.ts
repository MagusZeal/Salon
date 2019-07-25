import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const httpsReq = request.clone({
            url: "https://salonsw-e6485.firebaseio.com/" + request.url
        });

        return next.handle(httpsReq);
    }
}