import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCardRectangleComponent } from './shop-card-rectangle.component';

describe('ShopCardRectangleComponent', () => {
  let component: ShopCardRectangleComponent;
  let fixture: ComponentFixture<ShopCardRectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCardRectangleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCardRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
