import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStaffComponent } from './header-staff.component';

describe('HeaderStaffComponent', () => {
  let component: HeaderStaffComponent;
  let fixture: ComponentFixture<HeaderStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
