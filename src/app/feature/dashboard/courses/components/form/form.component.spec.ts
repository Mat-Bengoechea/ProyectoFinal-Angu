import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseService } from '../../../../../core/services/course.service';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../../../../../shared/shared.module';
import { of } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
   let courseServiceSpy: jasmine.SpyObj<CourseService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const courseServiceMock = jasmine.createSpyObj('CourseService', ['addCourse', 'updateCourse', 'courseEdit$']);
    courseServiceMock.courseEdit$ = of(null);
    const matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [SharedModule,ReactiveFormsModule, MatDialogModule],
      declarations: [FormComponent],
      providers: [{ provide: CourseService, useValue: courseServiceMock },
        { provide: MatDialog, useValue: matDialogMock },],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    courseServiceSpy = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    
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

    courseServiceSpy.courseEdit$ = of(mockCourse);
    component.ngOnInit();

    expect(component.formGroup.value).toEqual(mockCourse);
    expect(component.isEdit).toBeTrue();
  });

  it('should open the dialog and add a course when not in edit mode', () => {
    matDialogSpy.open.and.returnValue({
      afterClosed: () => of(true),
    } as any);

    const mockCourse = {
      id: 'generated-id',
      title: 'New Course',
      description: 'This is a new course',
      time: '60',
    };

    spyOn(component, 'submit').and.callThrough();
    spyOn(component['formGroup'], 'patchValue').and.callFake(() => {
      component.formGroup.setValue(mockCourse);
    });

    component.submit();

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(courseServiceSpy.addCourse).toHaveBeenCalledWith(mockCourse);
  });

  it('should reset the form and set isEdit to false after submission', () => {
    matDialogSpy.open.and.returnValue({
      afterClosed: () => of(true),
    } as any);

    component.isEdit = true;
    component.formGroup.setValue({
      id: '123',
      title: 'Updated Course',
      description: 'Updated description',
      time: '90',
    });

    component.submit();

    expect(component.formGroup.value).toEqual({
      id: '',
      title: '',
      description: '',
      time: '',
    });
    expect(component.isEdit).toBeFalse();
  });


});
