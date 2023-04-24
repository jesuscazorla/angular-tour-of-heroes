import { Injectable } from '@angular/core';
import { Hero} from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, find, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesURL = 'http://localhost:8080/api/heroes'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<any>(this.heroesURL).pipe(
      map(data => data._embedded.heroes),
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))

    );


  };


  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message : string){
    this.messageService.add(`HeroService: ${message}`);
  }


private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesURL+`/${hero.id}`, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesURL, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesURL}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }


  return this.http.get<any>(`${this.heroesURL}/search/findByNameContainingIgnoreCase?name=${term}`).pipe(
    map(a => a._embedded.heroes),
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),

    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

  apiImages(name : string): Observable<string>{
    //this.http.get<any>(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1000&apikey=5ee1aa5c2cf3a1c93efc8771ea1a52ee&hash=7c9f66a78fcdc34e6cdfb047b32dc505`).subscribe(a => console.log(a.data.results[0].thumbnail.path+"."+a.data.results[0].thumbnail.extension));
    return this.http.get<any>(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1000&apikey=5ee1aa5c2cf3a1c93efc8771ea1a52ee&hash=7c9f66a78fcdc34e6cdfb047b32dc505`).pipe(
      map(result => result.data.results[0].thumbnail.path+"."+result.data.results[0].thumbnail.extension)
    )




  }

//HASH MD5 API MARVEL
//http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=5ee1aa5c2cf3a1c93efc8771ea1a52ee&hash=7c9f66a78fcdc34e6cdfb047b32dc505
//7c9f66a78fcdc34e6cdfb047b32dc505



}

