import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InitComponent } from './init.component';
import { AuthService } from '../../../services/auth.service';

describe('InitComponent', () => {
  let component: InitComponent;
  let fixture: ComponentFixture<InitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        InitComponent
      ],
      providers: [ AuthService ],
    }).compileComponents();

    fixture = TestBed.createComponent(InitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Se verifica titulo del componente', () => {
    const element = fixture.debugElement.nativeElement;
    const title = element.querySelector('h1').textContent;
    expect(title).toEqual('Tablero');
  });

});
