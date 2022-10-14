import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { Curse } from 'src/app/models/curse';
import { CursesService } from 'src/app/services/curses.service';
import { InscriptionsService } from 'src/app/services/inscriptions.service';

@Component({
  selector: 'app-add-inscription',
  templateUrl: './add-inscription.component.html',
  styleUrls: ['./add-inscription.component.css']
})
export class AddInscriptionComponent implements OnInit {
  public form!: FormGroup;
  public newId: string = '';
  public curses$!: Observable<Curse[]>;
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddInscriptionComponent>, 
    private inscriptionService: InscriptionsService, private curseService: CursesService) {}

  ngOnInit(): void {
    this.getStudents();

    this.inscriptionService.getInscriptions().subscribe((data) => {
      let lastId: number = data.length -1;
      this.newId = (lastId + 1).toString();
    });

    this.initialize();
  }

  private getStudents() {
    this.curses$ = this.curseService.getCurses();
  }

  private initialize() {
    this.form = this.fb.group({
      id: this.newId,
      curse: ['', [Validators.required, Validators.maxLength(40)]],
      student: ['', [Validators.required, Validators.maxLength(40)]],
    }); 
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control]!.hasError(error);
  }
}
