import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JokeInterface } from '../interfeces';

@Injectable()
export class JokesService {
  constructor(private http: HttpClient) {}

  getJokes(): Observable<JokeInterface[]> {
    return this.http.get<JokeInterface[]>('assets/jokes.json').pipe(
      map((res) => {
        return res;
      })
    );
  }
}
