import {Injectable, OnInit} from '@angular/core';
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )

    // const heroes = of(HEROES)
    // this.log('HeroServeca: fetched heroes')
    // return heroes
  }

    handleError<T>(operation = 'operation', result ? : T)
    {
      return (error: any): Observable<T> => {
        console.error(error)
        this.log(`${operation} failed: ${error.message}`)
        return of(result as T)
      }
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHero(id: number): Observable<Hero> {

    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )

    // const hero = HEROES.find(h => h.id === id)!
    // this.log(`HeroService: fetched hero id=${id}`)
    // return of(hero)
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`created hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }


}
