import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CursesService } from '../../../../services/curses.service';

@Component({
  selector: 'app-add-curse',
  templateUrl: './add-curse.component.html',
  styleUrls: ['./add-curse.component.css']
})
export class AddCurseComponent implements OnInit {
  public form!: FormGroup;
  public newId: string = '';
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddCurseComponent>, 
    private curseService: CursesService) {}

  ngOnInit(): void {
    this.curseService.getCurses().subscribe((data) => {
      let lastId: number = data.length -1;
      this.newId = (lastId + 1).toString();
    });

    this.initialize();
  }

  private initialize() {
    this.form = this.fb.group({
      id: this.newId,
      title: ['', [Validators.required, Validators.maxLength(25)]],
      professor: ['', [Validators.required, Validators.maxLength(40)]],
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
