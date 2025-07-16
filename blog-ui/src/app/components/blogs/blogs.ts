import { Component, OnInit } from '@angular/core';
import { BlogCard } from '../shared/blog-card/blog-card';
import { BlogPost } from '../../models/blog-post';
import { CommonModule } from '@angular/common';
import { Blog } from '../../services/blog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blogs',
  imports: [BlogCard, CommonModule],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit {
  previousPage!: number;
  pageLimit!: number;
  nextPage!: number;
  hasPreviousPage!: boolean;
  currentPage!: number;
  totalPages!: number;
  hasNextPage!: boolean;
  blogPosts: BlogPost[] = [];
  excerptLength = 100;
  showLoadMore = true;
  loading = false;

  constructor(private blogService: Blog, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(page?: string, limit?: string) {
    this.loading=true
    this.blogService.getBlogs(page, limit).subscribe({
      next: (response) => {
        this.loading=false
        this.blogPosts = response.blogs;
        this.hasPreviousPage = response.metadata.hasPrevPage;
        this.hasNextPage = response.metadata.hasNextPage;
        this.currentPage = response.metadata.currentPage;
        this.totalPages = response.metadata.totalPages;
        this.previousPage = response.metadata.previousPage;
        this.nextPage = response.metadata.nextPage;
        this.pageLimit = response.metadata.limit;
      },
      error: (err) => {
        this.loading=false
        this.toaster.error(err.error.message);
      },
    });
  }

  goToNextPage() {
    this.loadBlogPosts(this.nextPage.toString(), this.pageLimit.toString());
  }

  goToPreviousPage() {
    this.loadBlogPosts(this.previousPage.toString(), this.pageLimit.toString());
  }
}
