import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablacourseuserComponent } from './tablacourseuser.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TablacourseuserComponent', () => {
  let component: TablacourseuserComponent;
  let fixture: ComponentFixture<TablacourseuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablacourseuserComponent],
      providers: [
        provideMockStore({}),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TablacourseuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
