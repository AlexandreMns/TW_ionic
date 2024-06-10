import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
})
export class AppComponent {
  title = 'library-client';
  selectedUser = 'Wonderful User';
  options = [
    { label: 'Wonderful User', value: 'Wonderful User' },
    { label: 'TWAM', value: 'TWAM' }
  ];

  constructor(private appService: AppService) { 
    // Load the required ionicons
    addIcons({
      home,
    });
  }

  updateUser() {
    this.appService.setUserId(this.selectedUser);
  }
}
