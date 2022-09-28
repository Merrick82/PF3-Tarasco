import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentsService } from '../../../../services/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public form!: FormGroup;
  public newId: string = '';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddStudentComponent>, 
    private studentService: StudentsService) {}
    
  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      let lastId: number = data.length -1;
      this.newId = (lastId + 1).toString();
    });

    this.initialize();
  }
    
  private initialize() {
    this.form = this.fb.group({
      id: this.newId,
      name: ['', [Validators.required, Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      average: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      active: ''
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
    return this.form.controls[control].hasError(error);
  }
}
