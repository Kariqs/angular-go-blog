import { Routes } from '@angular/router';
import { Blogs } from './components/blogs/blogs';
import { BlogInfo } from './components/blog-info/blog-info';
import { CreateBlog } from './components/create-blog/create-blog';
import { Search } from './components/search/search';

export const routes: Routes = [
  { path: '', component: Blogs, title: 'Blog Listings' },
  { path: 'create-blog', component: CreateBlog, title: 'Create Blog' },
  { path: 'blog/:slug', component: BlogInfo, title: 'Blog Info' },
  { path: 'search', component: Search, title: 'Search Blogs' },
];
