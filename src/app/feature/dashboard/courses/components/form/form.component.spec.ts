import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../../../shared/shared.module';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DialogcourseComponent } from '../../../../../shared/components/dialogo/dialogocourse.component';
import { CourseActions } from '../../store/course.actions';
import { selectCourseToEdit } from '../../store/course.selectors';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<FormComponent>>;

  const createStoreSpy = () => {
    const spy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    spy.select.and.callFake((selector: any) => {
      if (selector === selectCourseToEdit) {
        return of(null); 
      }
      return of();
    });
    return spy;
  };

  beforeEach(async () => {
    storeSpy = createStoreSpy();
    matDialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<FormComponent>>('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, MatDialogModule],
      declarations: [FormComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form values when editing a course', () => {
    const mockCourse = {
      id: '123',
      title: 'Test Course',
      description: 'This is a test course description',
      time: '120',
    };

    storeSpy.select.and.callFake((selector: any) => {
      if (selector === selectCourseToEdit) {
        return of(mockCourse);
      }
      return of();
    });

    component.ngOnInit();

    expect(component.formGroup.value).toEqual(mockCourse);
    expect(component.isEdit).toBeTrue();
  });

  it('should dispatch addCourse and close dialog when confirmed and not in edit mode', () => {
    const dialogMockRef = {
      afterClosed: () => of(true)
    } as any;

    matDialogSpy.open.and.returnValue(dialogMockRef);

    const formValue = {
      id: '',
      title: 'New Course',
      description: 'This is a new course',
      time: '60',
    };

    component.formGroup.setValue(formValue);
    component.isEdit = false;
    component.submit();

    expect(matDialogSpy.open).toHaveBeenCalledWith(DialogcourseComponent);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: CourseActions.addCourse.type,
      course: jasmine.objectContaining({
        title: 'New Course',
        description: 'This is a new course',
        time: '60',
      }),
    }));
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    expect(component.isEdit).toBeFalse();
  });

  it('should dispatch updateCourse when confirmed and in edit mode', () => {
    const dialogMockRef = {
      afterClosed: () => of(true)
    } as any;

    matDialogSpy.open.and.returnValue(dialogMockRef);

    component.formGroup.setValue({
      id: '123',
      title: 'Updated Course',
      description: 'Updated description',
      time: '90',
    });

    component.isEdit = true;
    component.submit();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: CourseActions.updateCourse.type,
      course: {
        id: '123',
        title: 'Updated Course',
        description: 'Updated description',
        time: '90',
      },
    }));

    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    expect(component.isEdit).toBeFalse();
  });
});
