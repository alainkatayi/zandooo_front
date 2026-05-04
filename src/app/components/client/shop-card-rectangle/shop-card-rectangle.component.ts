import { Component, Input } from '@angular/core';
import { Shop } from '../../../../core/models/shop';
import { environment } from '../../../../env/env';

@Component({
  selector: 'app-shop-card-rectangle',
  imports: [],
  templateUrl: './shop-card-rectangle.component.html',
  styleUrl: './shop-card-rectangle.component.css'
})
export class ShopCardRectangleComponent {
  @Input() shop!:Shop
  url = environment.url
}
