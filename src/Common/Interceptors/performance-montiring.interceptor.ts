import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class PerformanceMonitoringInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const start = Date.now();
        console.log(`Start Time... ${start}ms`);

        return next
        .handle()
        .pipe(
            tap(() => console.log(`Response Time... ${Date.now() - start}ms`)),
        );
    }
}