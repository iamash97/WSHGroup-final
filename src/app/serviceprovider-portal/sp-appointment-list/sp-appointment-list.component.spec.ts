import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpAppointmentListComponent } from './sp-appointment-list.component';

describe('SpAppointmentListComponent', () => {
  let component: SpAppointmentListComponent;
  let fixture: ComponentFixture<SpAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
