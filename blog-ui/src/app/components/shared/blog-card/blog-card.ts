import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BlogPost } from '../../../models/blog-post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
})
export class BlogCard {
  @Input() post: BlogPost = {
    ID: 1,
    title: 'Understanding Compensatory Damages in an ADA Context',
    slug: 'h12',
    content:
      "In ADA cases, prevailing plaintiffs are entitled to injunctive relief and attorneys' fees but not compensatory damages. These, along with punitive damages, are only available under certain circumstances and specific legal frameworks.",
    date: 'Dec 2023',
    readTime: '5 min Read',
  };

  @Input() excerptLength: number = 120;

  constructor(private router: Router) {}

  getExcerpt(content: string, maxLength: number): string {
    if (content.length <= maxLength) {
      return content;
    }

    // Find the last space before the max length to avoid cutting words
    const excerpt = content.substring(0, maxLength);
    const lastSpace = excerpt.lastIndexOf(' ');

    if (lastSpace > 0) {
      return excerpt.substring(0, lastSpace) + '...';
    }

    return excerpt + '...';
  }

  onReadMore(event: Event): void {
    event.preventDefault();
    this.router.navigate(['blog', this.post.slug]);
  }
}
