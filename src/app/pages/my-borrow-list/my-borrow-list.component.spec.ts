import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBorrowListComponent } from './my-borrow-list.component';

describe('MyBorrowListComponent', () => {
  let component: MyBorrowListComponent;
  let fixture: ComponentFixture<MyBorrowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBorrowListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBorrowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
