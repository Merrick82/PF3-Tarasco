import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Init } from '../models/init';
import { Session } from '../models/session';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api;
  public sessionSubject!: BehaviorSubject<Session>;
  public initSubject!: BehaviorSubject<Init>;

  constructor(private http: HttpClient, private router: Router) {
    const session = {
      activeSession: false
    }
    
    const init = {
      active: true
    }
    
    this.sessionSubject = new BehaviorSubject(session);
    this.initSubject = new BehaviorSubject(init);
  }

  public login(user: User) {
    this.http.get<User[]>(`${this.api}/operators`).pipe(
      map((users: User[]) => {
        return users.filter((u: User) => u.username === user.username && u.password === user.password)[0];
      })
    ).subscribe((user: User) => {
      if (user) {
        const session: Session = {
          activeSession: true,
          user: {
            id: user.id,
            username: user.username,
            password: user.password,
            name: user.name,
            lastname: user.lastname,
            admin: user.admin
          }
        };
    
        this.sessionSubject.next(session);
        this.router.navigate(['dashboard']);
      } else {
        const session: Session = {
          activeSession: false,
          error: {
            message: 'Usuario no encontrado'
          }
        };
    
        this.sessionSubject.next(session);
      }
    });
  }

  public logout() {
    const session: Session = {
      activeSession: false
    };

    this.sessionSubject.next(session);
    this.changeInitState(true);
    this.router.navigate(['/login']);
  }

  public getSession(): Observable<Session> {
    return this.sessionSubject.asObservable();
  }

  public getInitState(): Observable<Init> {
    return this.initSubject.asObservable();
  }

  public changeInitState(val: boolean) {
    const init: Init = {
      active: val
    }
    
    this.initSubject.next(init);
  }
}
