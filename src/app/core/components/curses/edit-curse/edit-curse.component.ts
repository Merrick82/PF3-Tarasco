import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curse } from 'src/app/models/curse';

@Component({
  selector: 'app-edit-curse',
  templateUrl: './edit-curse.component.html',
  styleUrls: ['./edit-curse.component.css']
})
export class EditCurseComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditCurseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curse) { 
    this.form = fb.group({
      id: new FormControl(data.id),
      title: [data.title, [Validators.required, Validators.maxLength(25)]],
      professor: [data.professor, [Validators.required, Validators.maxLength(25)]],
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
