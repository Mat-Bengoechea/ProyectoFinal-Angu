import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../../core/services/course.service';
import { Course } from '../../interface/course';
import { selectCourseByTitle } from '../../store/course.selectors';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/services/store';
@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  course: Course | undefined;
  isLoading: boolean = true;
  error: string | undefined;

  constructor(
    private store: Store<RootState>,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute
  ) {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    this.store.select(selectCourseByTitle(title!)).subscribe({
      next: (course)=> {
        this.isLoading = false;
        if (course) {
          this.course = course;
        }
        else {
          this.error = 'No se encontró el curso';
        }
      },
      error: () => {
        this.isLoading = false;
        this.error = 'Error al cargar el curso';
      }
    })


  }
}
