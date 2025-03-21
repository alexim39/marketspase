import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { videos } from './videos';
import { CommonModule } from '@angular/common';

export interface Video {
  title: string;
  subtitle: string;
  description: string;
  embedUrl: string;
  thumbnailUrl: string;
  category: string;
}

/**
 * @title Video component
 */
@Component({
  selector: 'async-video',
  templateUrl: 'videos.component.html',
  styleUrls: ['videos.component.scss'],
  standalone: true,
  imports: [MatCardModule, RouterModule, CommonModule],
})
export class VideosComponent {

  videos: Video[] = videos;
  selectedCategory: string = '';

  constructor() { }

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openVideoOnUrl(video: Video): void {
    window.open(video.embedUrl, '_blank'); // Open URL in a new tab
  }

  filterVideo(cat: string): void {
    this.selectedCategory = cat;
  }

  get filteredVideos(): Video[] {
    if (this.selectedCategory === '') {
      return this.videos; // Return all videos if no category is selected
    }

    return this.videos.filter(video => video.category === this.selectedCategory);
  }

}