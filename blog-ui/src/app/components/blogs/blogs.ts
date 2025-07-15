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
  blogPosts: BlogPost[] = [];
  excerptLength = 100;
  showLoadMore = true;

  constructor(private blogService: Blog, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.blogService.getBlogs().subscribe({
      next: (response) => {
        this.blogPosts = response.blogs;
      },
      error: (err) => {
        this.toaster.error(err.error.message);
      },
    });
  }
}
