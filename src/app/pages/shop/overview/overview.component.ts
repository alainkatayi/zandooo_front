import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/client/navbar/navbar.component";
import { FooterComponent } from "../../../components/client/footer/footer.component";

@Component({
  selector: 'app-overview',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

}
