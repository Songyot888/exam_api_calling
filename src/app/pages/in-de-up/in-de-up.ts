import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-in-de-up',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './in-de-up.html',
  styleUrl: './in-de-up.scss'
})
export class InDeUp {

}
