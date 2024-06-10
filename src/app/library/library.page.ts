import { SearchPage } from './../search/search.page';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Library } from '../models/Library';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { LibraryServiceService } from '../library-service.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, SearchPage]
})
export class LibraryPage implements OnInit {
  library: Library;
  userId: string = '';

  constructor(private libraryService: LibraryServiceService, private route: ActivatedRoute, private appService: AppService) {
    this.library = {} as Library;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );
  }

  ngOnInit(): void {
    this.initLibrary();
  }

  private initLibrary() {
    const libraryId = this.route.snapshot.queryParamMap.get('libraryId');
    this.libraryService.getCurrentLibrary(libraryId).subscribe(
      value => this.library = <Library>value
    );
  }

  getLibrary(libraryId: string) {
    this.libraryService.getCurrentLibrary(libraryId).subscribe(
      value => this.library = <Library>value
    );
  }

}