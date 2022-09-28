import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curse } from '../models/curse';

@Injectable({
  providedIn: 'root'
})
export class CursesService {
  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  public getCurses(): Observable<Curse[]> {
    return this.http.get<Curse[]>(`${this.api}/curses`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    })
  }

  public addCurse(curse: Curse) {
    return this.http.post<Curse>(`${this.api}/curses`, curse);
  }

  public editCurse(curse: Curse) {
    return this.http.put<Curse>(`${this.api}/curses/${curse.id}`, curse);
  }

  public deleteCurse(id: string) {
    return this.http.delete<Curse>(`${this.api}/curses/${id}`);
  }
}
