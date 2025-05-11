import { Component, Inject, OnInit } from '@angular/core';
import { Course } from '../../interface/course';
import { CourseService } from '../../../../../core/services/course.service';

@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'time', 'actions'];
  dataSource: Course[] = [];

  constructor(
    private courseService: CourseService,
    @Inject('Title') private title: string
  ) {}

  ngOnInit(): void {
    console.log('Courses:', this.title);
    this.courseService.getCourses();
    this.courseService.courses$.subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
    });
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id);
  }

  editCourse(id: string) {
    this.courseService.setUpdateCourse(id);
  }
}
