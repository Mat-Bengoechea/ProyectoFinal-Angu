import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { login } from '../../../core/services/store/auth/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<LoginComponent>>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    const matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [LoginComponent, FooterComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MatDialog, useValue: matDialogMock },
        provideMockStore({})
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as MockStore;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    matDialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<LoginComponent>>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with default values and valid', () => {
    const form = component.loginForm;
    expect(form.value.email).toBe('mateo@gmail.com');
    expect(form.value.password).toBe('1234');
    expect(form.valid).toBeTrue();
  });

  it('should mark form invalid if email is empty', () => {
    component.loginForm.controls['email'].setValue('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should mark form invalid if password is empty', () => {
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should dispatch login action with email and password on submit when form valid', () => {
    spyOn(store, 'dispatch');
    component.loginForm.setValue({ email: 'test@mail.com', password: 'pass1234' });

    component.submit();

    expect(store.dispatch).toHaveBeenCalledWith(
      login({ email: 'test@mail.com', password: 'pass1234' })
    );
  });

  it('should NOT dispatch login action if form is invalid', () => {
    spyOn(store, 'dispatch');
    component.loginForm.setValue({ email: '', password: '' });

    component.submit();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should open user form dialog', () => {
    component.openFormDialog();
    expect(matDialogSpy.open).toHaveBeenCalled();
  });
});
