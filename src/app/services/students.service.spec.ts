import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { of } from 'rxjs';

describe('StudentsService', () => {
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy, post: jasmine.Spy };
  let service: StudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new StudentsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar un arreglo de alumnos', (done: DoneFn) => {
    const mockData = [
        { id: '1', name: 'Yanina', lastname: 'Garcia', email: 'ygarcia@gmail.com', average: 7, active: true },
        { id: '2', name: 'Cristian', lastname: 'Gomez', email: 'cris.gomez@gmail.com', average: 6, active: true },
        { id: '3', name: 'Lorena', lastname: 'Ruttini', email: 'lore1999@yahoo.com.ar', average: 9, active: true },
        { id: '4', name: 'Xiomara', lastname: 'Valente', email: 'xiomara97@gmail.com', average: 8.5, active: true }
    ];

    httpClientSpy.get.and.returnValue(of(mockData));

    service.getStudents().subscribe((students) => {
        expect(students).toEqual(mockData);
        done();
    });
  });

  it('Debe insertar un nuevo alumno', (done: DoneFn) => {
    const studentMock = { id: '5', name: 'Martin', lastname: 'Miguez', email: 'mmiguez@gmail.com', average: 5, active: true };

    httpClientSpy.post.and.returnValue(of(studentMock));

    service.addStudent(studentMock).subscribe((student) => {
        expect(student).toEqual(studentMock);
        expect
        done();
    });
  });

  it('Debe editar un alumno', (done: DoneFn) => {
    const studentsMock = [
        { id: '1', name: 'Martin', lastname: 'Miguez', email: 'mmiguez@gmail.com', average: 5, active: true },
        { id: '2', name: 'Sheila', lastname: 'Miguez', email: 'smiguez@gmail.com', average: 5, active: true }
    ]

    let updStudent = studentsMock[1];
    updStudent.name = 'Romina';

    httpClientSpy.put.and.returnValue(of(updStudent));

    service.editStudent(updStudent).subscribe((student) => {
        expect(student.name).toEqual('Romina');
        expect(student.lastname).toEqual('Miguez');
        expect(student.email).toEqual('smiguez@gmail.com');
        done();
    });
  });
});
