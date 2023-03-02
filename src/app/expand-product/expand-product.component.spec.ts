import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandProductComponent } from './expand-product.component';

describe('ExpandProductComponent', () => {
  let component: ExpandProductComponent;
  let fixture: ComponentFixture<ExpandProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
