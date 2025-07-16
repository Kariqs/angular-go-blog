import { Component } from '@angular/core';
import { BlogPost } from '../../models/blog-post';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCard } from '../shared/blog-card/blog-card';
import { Blog } from '../../services/blog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchTerm: string = '';
  searchedPosts: BlogPost[] = [];
  exerptLength = 100;

  constructor(
    private router: Router,
    private blogService: Blog,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchterm'] || '';
      this.onSearch();
    });
  }

  onInputChange() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchterm: this.searchTerm },
      queryParamsHandling: 'merge',
    });

    this.onSearch();
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.searchedPosts = [];
      return;
    }

    this.blogService.getBlogs(undefined, undefined, this.searchTerm).subscribe({
      next: (response) => {
        this.searchedPosts = response.blogs;
      },
      error: (err) => {
        this.toaster.error(err.error.message || 'Failed to fetch blogs');
      },
    });
  }

  goBack() {
    this.router.navigate(['']);
  }
}
