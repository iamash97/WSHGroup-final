import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewServiceComponent } from './register-new-service.component';

describe('RegisterNewServiceComponent', () => {
  let component: RegisterNewServiceComponent;
  let fixture: ComponentFixture<RegisterNewServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
