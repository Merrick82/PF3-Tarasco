import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) { 
      this.form = fb.group({
        id: new FormControl(data.id),
        name: [data.name, [Validators.required, Validators.maxLength(25)]],
        lastname: [data.lastname, [Validators.required, Validators.maxLength(25)]],
        email: [data.email, [Validators.required, Validators.email]],
        average: [data.average, [Validators.required, Validators.min(1), Validators.max(10)]],
        active: [data.active]
      });
  }

  ngOnInit(): void {
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
    return this.form.controls[control].hasError(error);
  }
}
