import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Item Reservation';
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate([''])
  }
}
