import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_frontend is being generated';
}
