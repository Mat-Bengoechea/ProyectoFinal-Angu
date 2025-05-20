import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablauserComponent } from './tablauser.component';
import { userService } from '../../../../../core/services/UserService.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

describe('TablauserComponent', () => {
  let component: TablauserComponent;
  let fixture: ComponentFixture<TablauserComponent>;
  let mockUserService: any;
  let mockDialog: any;

  beforeEach(async () => {
    mockUserService = {
      UserList$: of([
        {
          id: '1',
          fullname: 'Juan Perez',
          email: 'juan@mail.com',
          password: 'Test1234',
          role: 'admin',
        },
      ]),

      getuserListobs: jasmine.createSpy('getuserListobs'),
      setUpdateUser: jasmine.createSpy('setUpdateUser'),
      deleteUser: jasmine.createSpy('deleteUser'),
    };
    mockDialog = {
      open: jasmine.createSpy('open'),
    };
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatIconModule],
      declarations: [TablauserComponent],
      providers: [
        { provide: userService, useValue: mockUserService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TablauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should initialize TableUser with data from service', () => {
    expect(component.TableUser.length).toBe(1);
    expect(component.TableUser[0].fullname).toBe('Juan Perez');
    expect(mockUserService.getuserListobs).toHaveBeenCalled();
  });

  it('should call setUpdateUser and open dialog on userEdit', () => {
    component.userEdit('1');
    expect(mockUserService.setUpdateUser).toHaveBeenCalledWith('1');
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should call deleteUser on deleteUser', () => {
    component.deleteUser('1');
    expect(mockUserService.deleteUser).toHaveBeenCalledWith('1');
  });
});
