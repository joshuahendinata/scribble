import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrItemDetailComponent } from './sr-item-detail.component';

describe('SrItemDetailComponent', () => {
  let component: SrItemDetailComponent;
  let fixture: ComponentFixture<SrItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
