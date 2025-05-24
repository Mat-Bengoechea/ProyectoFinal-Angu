import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormuserComponent } from './formuser.component';
import { userService } from '../../../../../core/services/UserService.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


xdescribe('FormuserComponent', () => {
  let component: FormuserComponent;
  let fixture: ComponentFixture<FormuserComponent>;
  let mockUserService: any;

  beforeEach(async () => {
    mockUserService = {
      userEdit$: of(null),
      updatedUser: jasmine.createSpy('updatedUser'),
      adduserListobs: jasmine.createSpy('adduserListobs'),
    };
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
      ],
      declarations: [FormuserComponent],
      providers: [{ provide: userService, useValue: mockUserService },
        {provide: MatDialogRef, useValue:{ close: jasmine.createSpy('close') }}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have invalid form when empty', () => {
    expect(component.formuser.valid).toBeFalse();
  });

  it('should validate email field', () => {
    const email = component.formuser.controls['email'];
    email.setValue('invalid-email');
    expect(email.valid).toBeFalse();
    email.setValue('test@example.com');
    expect(email.valid).toBeTrue();
  });

  it('should call adduserListobs on submit when not editing', () => {
    component.formuser.setValue({
      id: '',
      fullname: 'Juan Perez',
      email: 'test@example.com',
      password: 'Password1',
      role: 'admin',
    });
    component.isEdit = false;
     expect(component.formuser.valid).toBeTrue();
    component.submitFormuser();
    console.log(component.formuser.errors, component.formuser.value, component.formuser.valid);
    expect(mockUserService.adduserListobs).toHaveBeenCalled();
  });

  it('should call updatedUser on submit when editing', () => {
    component.formuser.setValue({
      id: '1',
      fullname: 'Juan Perez',
      email: 'edit@example.com',
      password: 'Password1',
      role: 'user',
    });
    component.isEdit = true;
    component.submitFormuser();
    expect(mockUserService.updatedUser).toHaveBeenCalled();
  });

  it('should reset form and isEdit after submit', () => {
    component.formuser.setValue({
      id: '',
      fullname: 'Juan Perez',
      email: 'test@example.com',
      password: 'Password1',
      role: 'admin',
    });
    component.isEdit = false;
    component.submitFormuser();
    expect(component.formuser.value.email).toBeNull();
    expect(component.isEdit).toBeFalse();
  });
});
