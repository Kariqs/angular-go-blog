import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../../services/blog';

@Component({
  selector: 'app-create-blog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.css',
})
export class CreateBlog {
  blogForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private blogService: Blog
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      slug: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];

      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        alert('Please select a PNG or JPEG image file.');
        this.selectedFile = null;
        target.value = '';
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (this.selectedFile.size > maxSize) {
        alert('File size should not exceed 5MB.');
        this.selectedFile = null;
        target.value = '';
        return;
      }
    }
  }

  getContentLength(): number {
    const content = this.blogForm.get('content')?.value || '';
    return content.length;
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const formData = new FormData();
      formData.append('title', this.blogForm.get('title')?.value);
      formData.append('date', this.blogForm.get('date')?.value);
      formData.append('slug', this.blogForm.get('slug')?.value);
      formData.append('content', this.blogForm.get('content')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.blogService.createBlog(formData).subscribe({
        next: (response) => {
          this.toaster.info(response.message);
          this.resetForm();
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
          this.toaster.error(err.error?.message || 'Error creating blog');
        },
      });

      console.log('Blog post data:', formData);
    } else {
      Object.keys(this.blogForm.controls).forEach((key) => {
        this.blogForm.get(key)?.markAsTouched();
      });
    }
  }

  closeModal(): void {
    this.resetForm();
    this.router.navigate(['']);
  }

  private resetForm(): void {
    this.blogForm.reset();
    this.selectedFile = null;
  }
}
