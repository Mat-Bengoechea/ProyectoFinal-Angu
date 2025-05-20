import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<LoginComponent>>;

  const mockuser = {
    email: 'mateo@gmail.com',
    password: '1234',
    role: 'user',
    fullname: 'Mateo Garcia',
  };

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [LoginComponent, FooterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        provideMockStore({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    matDialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<LoginComponent>
    >;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with default values', () => {
    const loginForm = component.loginForm.value;
    expect(loginForm.email).toBe('mateo@gmail.com');
    expect(loginForm.password).toBe('1234');
  });

  it('should mark the form as invalid if email is missing', () => {
    component.loginForm.controls['email'].setValue('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should mark the form as invalid if password is missing', () => {
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should call AuthService.login with correct credentials when form is valid', () => {
    authServiceSpy.login.and.returnValue(of(mockuser));
    component.loginForm.setValue({
      email: 'mateo@gmail.com',
      password: '1234',
    });
    expect(component.loginForm.valid).toBeTrue();
    component.submit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      'mateo@gmail.com',
      '1234'
    );
  });

  it('should show an alert if login fails', () => {
    spyOn(window, 'alert');
    authServiceSpy.login.and.returnValue(of(null));
    component.loginForm.setValue({
      email: 'mateo@gmail.com',
      password: '1234',
    });
    expect(component.loginForm.valid).toBeTrue();
    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Email o contraseña incorrectos');
  });

  it('should navigate to /dashboard if login succeeds and dialog is not open', () => {
    authServiceSpy.login.and.returnValue(of(mockuser));
    component['MatDialogRef'] = null as unknown as MatDialogRef<LoginComponent>;
    component.loginForm.setValue({
      email: 'mateo@gmail.com',
      password: '1234',
    });
    expect(component.loginForm.valid).toBeTrue();
    component.submit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should close the dialog if login succeeds and dialog is open', () => {
    authServiceSpy.login.and.returnValue(of(mockuser));
    component.loginForm.setValue({
      email: 'mateo@gmail.com',
      password: '1234',
    });
    expect(component.loginForm.valid).toBeTrue();
    component.submit();

    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});
