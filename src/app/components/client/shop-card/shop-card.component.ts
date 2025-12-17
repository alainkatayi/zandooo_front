import { Component, Input } from '@angular/core';
import { Shop } from '../../../../core/models/shop';

@Component({
  selector: 'app-shop-card',
  imports: [],
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.css'
})
export class ShopCardComponent {

  @Input() shop!:Shop

}
