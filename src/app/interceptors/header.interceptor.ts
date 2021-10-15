import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            // setHeaders: {
            //     "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            //     "x-rapidapi-key": "369ba9505bmshba1d97a51dc4816p1fb0bfjsnb433f3f9f92f"
            // },
            setParams: {
                key: '4b059142967d4d99bd5f39def85a68d7',
            }
        })
        return next.handle(req)
    }
}