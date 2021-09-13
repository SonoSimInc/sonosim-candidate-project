import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Probe } from './probe';

@Injectable({
  providedIn: 'root'
})
export class ProbeService {
  private probesUrl: string = 'https://sonosim.com/probes.json';

  constructor(private http: HttpClient) { }

  /**
   * Fetches probe data from SonoSim API
   */
  getProbes(): Observable<Probe[]> {
    return this.http.get<Probe[]>(this.probesUrl)
      .pipe(
        tap(_ => console.log('Fetched probes.')),
        catchError(this.handleError<Probe[]>('getProbes', []))
      );
  }

    /**
   * Borrowed from Angular docs setup:
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
