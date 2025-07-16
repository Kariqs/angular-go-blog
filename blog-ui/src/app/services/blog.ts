import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post';
import { ErrorHandler } from '../utils/error-handler';

interface CreateBlogResponse {
  message: string;
  blog: BlogPost;
}

interface GetBlogsResponse {
  blogs: BlogPost[];
  metadata: {
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    previousPage: number;
    total: number;
    totalPages: number;
  };
}

interface GetBlogResponse {
  blog: BlogPost;
}

@Injectable({
  providedIn: 'root',
})
export class Blog {
  apiUrl = 'http://localhost:3000/api/blog';

  constructor(private http: HttpClient, private router: Router) {}

  //Create Blog
  createBlog(blogInfo: FormData): Observable<CreateBlogResponse> {
    return this.http
      .post<CreateBlogResponse>(this.apiUrl, blogInfo)
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }

  //Fetch all blogs
  getBlogs(
    page?: string,
    limit?: string,
    searchTerm?: string
  ): Observable<GetBlogsResponse> {
    let params = new HttpParams();

    if (page) {
      params = params.set('page', page);
    }

    if (limit) {
      params = params.set('limit', limit);
    }

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http
      .get<GetBlogsResponse>(this.apiUrl, { params })
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }

  //Fetch a single blog
  getBlog(slug: string): Observable<GetBlogResponse> {
    return this.http
      .get<GetBlogResponse>(`${this.apiUrl}/${slug}`)
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }
}
