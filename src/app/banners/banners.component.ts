import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfigService } from '../shared/services/config.service';
import { Banner } from 'src/assets/banner';
import { BannerService } from '../shared/services/banner.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  banners:Banner[] = [];
  slideIndex = 0;
   
  constructor(private config: ConfigService, public bannerService: BannerService) { }

  ngOnInit(): void {
    this.banners = this.config.getConfig().banners;
    console.log('BannER');
    this.bannerService.initialized$.subscribe(data => {
      console.log(data)
    })
  }

  prevSlide() {
    if (this.slideIndex === 0) {
      this.slideIndex = this.banners.length - 1;
    } else {
      this.slideIndex--;
    }
  }

  nextSlide() {
    if (this.slideIndex === this.banners.length-1) {
      this.slideIndex = 0;
    } else {
      this.slideIndex++;
    }
  }
}
