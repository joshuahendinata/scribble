import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrItemComponent } from './sr-item.component';

describe('SrItemComponent', () => {
  let component: SrItemComponent;
  let fixture: ComponentFixture<SrItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
