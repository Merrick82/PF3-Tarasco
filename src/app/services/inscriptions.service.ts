import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Inscription } from "../models/inscription";

@Injectable({
    providedIn: 'root'
})
export class InscriptionsService {
    private api: string = environment.api;
  
    constructor(private http: HttpClient) { }
  
    public getInscriptions(): Observable<Inscription[]> {
      return this.http.get<Inscription[]>(`${this.api}/inscriptions`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'encoding': 'UTF-8'
        })
      })
    }
  
    public addInscription(inscription: Inscription) {
      return this.http.post<Inscription>(`${this.api}/inscriptions`, inscription);
    }
  
    public editInscription(inscription: Inscription) {
      return this.http.put<Inscription>(`${this.api}/inscriptions/${inscription.id}`, inscription);
    }
  
    public deleteInscription(id: string) {
      return this.http.delete<Inscription>(`${this.api}/inscriptions/${id}`);
    }
  }
