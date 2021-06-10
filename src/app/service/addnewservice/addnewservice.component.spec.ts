import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewserviceComponent } from './addnewservice.component';

describe('AddnewserviceComponent', () => {
  let component: AddnewserviceComponent;
  let fixture: ComponentFixture<AddnewserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
