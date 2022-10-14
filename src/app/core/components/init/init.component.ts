import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {
  public cards: any = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.cards = [
      { id: 1, title: 'Alumnos', path: 'students-list' },
      { id: 2, title: 'Cursos', path: 'curses-list' },
      { id: 3, title: 'Inscripciones', path: 'inscriptions-list' }
    ];
  }

  private hideInit() {
    this.authService.changeInitState(false);
  }

  public navigateTo(path: String) {
    this.hideInit();
    this.router.navigate([`/dashboard/${path}`]);
  }
}
