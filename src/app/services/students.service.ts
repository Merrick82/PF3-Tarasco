import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.api}/students`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    })
  }

  public addStudent(student: Student) {
    return this.http.post<Student>(`${this.api}/students`, student);
  }

  public editStudent(student: Student) {
    return this.http.put<Student>(`${this.api}/students/${student.id}`, student);
  }

  public deleteStudent(id: string) {
    return this.http.delete<Student>(`${this.api}/students/${id}`);
  }
}
