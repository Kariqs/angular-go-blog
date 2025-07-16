import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private router: Router) {}

  searchTerm: string = '';

  onCreateBlog() {
    this.router.navigate(['create-blog']);
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.router.navigate(['']);
      return;
    }

    this.router.navigate(['search'], {
      queryParams: { searchterm: this.searchTerm },
    });
  }

  onSearchInput() {
    if (!this.searchTerm.trim()) {
      this.router.navigate(['']);
      return;
    }

    this.router.navigate(['search'], {
      queryParams: { searchterm: this.searchTerm },
    });
  }
}
