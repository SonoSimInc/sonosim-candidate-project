import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Module } from './module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private modulesUrl: string = 'https://sonosim.com/modules.json';

  constructor(private http: HttpClient) { }

  /**
   * Fetches module data from SonoSim API
   */
  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.modulesUrl)
      .pipe(
        tap(_ => console.log('Fetched modules.')),
        catchError(this.handleError<Module[]>('getModules', []))
      );
  }

    /**
   * Borrowed from Angular tutorial.
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log error to console
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
