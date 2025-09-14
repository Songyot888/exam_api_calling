import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './pages/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'exam_api_calling';
}
