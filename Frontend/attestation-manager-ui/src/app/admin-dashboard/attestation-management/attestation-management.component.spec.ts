import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationManagementComponent } from './attestation-management.component';

describe('AttestationManagementComponent', () => {
  let component: AttestationManagementComponent;
  let fixture: ComponentFixture<AttestationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttestationManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttestationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
