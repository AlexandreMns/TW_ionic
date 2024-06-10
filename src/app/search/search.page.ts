import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Library } from '../models/Library';
import { LibraryServiceService } from '../library-service.service';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class SearchPage implements OnInit {
  libraries: Library[] = [];
  bookCoverIcon = '../../assets/icon/book_question_image.svg';

  constructor(private libraryService: LibraryServiceService) { }

  ngOnInit(): void {
    this.libraryService.getLibraries().subscribe(value => this.libraries = value);
  }

}
