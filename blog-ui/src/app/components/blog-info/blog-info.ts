import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../../models/blog-post';
import { CommonModule } from '@angular/common';
import { Blog } from '../../services/blog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-info',
  imports: [CommonModule],
  templateUrl: './blog-info.html',
  styleUrl: './blog-info.css',
})
export class BlogInfo {
  blogPost!: BlogPost;

  hasPreviousPost = true;
  hasNextPost = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: Blog,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    const blogSlug = this.route.snapshot.paramMap.get('slug');
    if (blogSlug) {
      this.loadBlogPost(blogSlug);
    }
  }

  loadBlogPost(slug: string) {
    this.blogService.getBlog(slug).subscribe({
      next: (response) => {
        this.blogPost = response.blog;
      },
      error: (err) => {
        this.toaster.error(err.message);
      },
    });
  }

  goBack() {
    this.router.navigate(['']);
  }

  goToPrevious() {
    this.router.navigate(['/blog', 'previous-post-id']);
  }

  goToNext() {
    this.router.navigate(['/blog', 'next-post-id']);
  }

  getFormattedContent(): string {
    return this.blogPost.content;
  }
}
