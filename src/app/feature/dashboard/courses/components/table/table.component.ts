import { Component, Inject, OnInit } from '@angular/core';
import { Course } from '../../interface/course';
import { CourseService } from '../../../../../core/services/course.service';

@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent  implements OnInit{
  displayedColumns: string[] = ['title', 'description', 'actions'];
  dataSource: Course[] = [];


  constructor(
    private courseService: CourseService,
    @Inject('Title') private title: string
  ) {}

  ngOnInit(): void {
    console.log('Courses:',this.title);
    this.courseService.getCourses();
    this.courseService.courses$.subscribe((data) => {
      console.log(data);
      this.dataSource = data;
    });
  }
}
