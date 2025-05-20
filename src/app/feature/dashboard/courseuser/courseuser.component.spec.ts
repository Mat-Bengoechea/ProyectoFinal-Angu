import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseuserComponent } from './courseuser.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseuserComponent', () => {
  let component: CourseuserComponent;
  let fixture: ComponentFixture<CourseuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseuserComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
