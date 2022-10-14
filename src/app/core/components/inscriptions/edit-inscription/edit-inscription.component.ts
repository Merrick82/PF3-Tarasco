import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Curse } from 'src/app/models/curse';
import { Inscription } from 'src/app/models/inscription';
import { CursesService } from 'src/app/services/curses.service';

@Component({
  selector: 'app-edit-inscription',
  templateUrl: './edit-inscription.component.html',
  styleUrls: ['./edit-inscription.component.css']
})
export class EditInscriptionComponent implements OnInit {
  public form!: FormGroup;
  public curses$!: Observable<Curse[]>;
  public selected!: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditInscriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscription, private curseService: CursesService) {
      this.selected = data.curse;
      this.form = this.fb.group({
        id: new FormControl(data.id),
        curse: [data.curse, [Validators.required, Validators.maxLength(40)]],
        student: [data.student, [Validators.required, Validators.maxLength(40)]],
      }); 
  }

  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents() {
    this.curses$ = this.curseService.getCurses();
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    if (this.form.valid && this.form.valueChanges) {
      this.dialogRef.close(this.form.value);
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }
}
