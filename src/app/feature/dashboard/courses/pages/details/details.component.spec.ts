import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interface/course';
import { MemoizedSelector } from '@ngrx/store';
import { RootState } from '../../../../../core/services/store';
import { selectCourseByTitle } from '../../store/course.selectors';
import { CourseService } from '../../../../../core/services/course.service';
import { of, throwError } from 'rxjs';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let store: MockStore;
  let mockSelectCourseByTitle: MemoizedSelector<RootState, Course | undefined>;

  const mockCourse: Course = {
    id: '1',
    title: 'Angular Avanzado',
    description: 'Curso de Angular para expertos',
    time: '120',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'title' ? 'Angular Avanzado' : null),
              },
            },
          },
        },
        {
          provide: CourseService,
          useValue: {}, 
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockSelectCourseByTitle = store.overrideSelector(
      selectCourseByTitle('Angular Avanzado'),
      mockCourse
    );

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load course if found by title', () => {
    expect(component.isLoading).toBeFalse();
    expect(component.course).toEqual(mockCourse);
    expect(component.error).toBeUndefined();
  });

  it('should show error if course not found', () => {
    mockSelectCourseByTitle.setResult(undefined);
    store.refreshState();
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.course).toBeUndefined();
    expect(component.error).toBe('No se encontró el curso');
  });

  it('should show error if store selector throws error', () => {
    spyOn(store, 'select').and.returnValue(
      throwError(() => new Error('Store error'))
    );
    component = TestBed.createComponent(DetailsComponent).componentInstance;
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.course).toBeUndefined();
    expect(component.error).toBe('Error al cargar el curso');
  });
});
