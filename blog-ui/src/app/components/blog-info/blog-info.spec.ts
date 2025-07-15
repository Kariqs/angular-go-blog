import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogInfo } from './blog-info';

describe('BlogInfo', () => {
  let component: BlogInfo;
  let fixture: ComponentFixture<BlogInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
