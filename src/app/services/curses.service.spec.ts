import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CursesService } from './curses.service';
import { of } from 'rxjs';


describe('CursesService', () => {
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy, post: jasmine.Spy };
  let service: CursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new CursesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar un arreglo de cursos', (done: DoneFn) => {
    const mockData = [
        { id: '1', title: 'Angular', professor: 'Juan Garcia', active: true },
        { id: '2', title: 'React', professor: 'Alexander Romero', active: false },
        { id: '3', title: 'Java', professor: 'Carolina Martinez', active: true },
        { id: '4', title: 'Ruby', professor: 'Eric Estrada', active: true },
    ];

    httpClientSpy.get.and.returnValue(of(mockData));

    service.getCurses().subscribe((curses) => {
        expect(curses).toEqual(mockData);
        done();
    });
  });

  it('Debe insertar un nuevo curso', (done: DoneFn) => {
    const curseMock = { id: '5', title: 'Scala', professor: 'Agustina Lopez', active: false };

    httpClientSpy.post.and.returnValue(of(curseMock));

    service.addCurse(curseMock).subscribe((curses) => {
        expect(curses).toEqual(curseMock);
        done();
    });
  });

  it('Debe editar un curso', (done: DoneFn) => {
    const cursesMock = [
        { id: '1', title: 'Angular', professor: 'Juan Garcia', active: true },
        { id: '2', title: 'React', professor: 'Alexander Romero', active: false }
    ]

    let updCurse = cursesMock[1];
    updCurse.professor = 'Enrique Ramirez';
    updCurse.active = true;

    httpClientSpy.put.and.returnValue(of(updCurse));

    service.editCurse(updCurse).subscribe((curse) => {
        expect(curse.professor).toEqual('Enrique Ramirez');
        expect(curse.active).toEqual(true);
        expect(curse.title).toEqual('React');
        done();
    });
  });
});
