import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentsComponent } from './create-students.component';

describe('CreateStudentsComponent', () => {
  let component: CreateStudentsComponent;
  let fixture: ComponentFixture<CreateStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
