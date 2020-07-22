import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../api-service.service';
import { carousl } from  '../objects';
import { trigger, transition, style, animate } from "@angular/animations";
//import { OwlModule } from 'ngx-owl-carousel';

@Component({
  selector: 'app-carousl',
  templateUrl: './carousl.component.html',
  styleUrls: ['./carousl.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]

})

export class CarouslComponent implements OnInit {
  carousl:carousl[];
  carouslItems: carousl = {
    cId         :null,
    cName       :null,
    cDiscription:null,
    CImg        :null,
  };

  // mySlideOptions={items: 1, dots: true, nav: true};
  // myCarouselOptions={items: 3, dots: true, nav: true};

  constructor(private apiService: ApiServiceService,config: NgbCarouselConfig) {
    config.interval = 4000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  ngOnInit(): void {
    this.apiService.readCarousl().subscribe((selectedItem: carousl[])=>{
      this.carousl = selectedItem;
      console.log(selectedItem);
    })
  }

}
