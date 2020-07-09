import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { specialDeals } from  '../objects';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-special-deals',
  templateUrl: './special-deals.component.html',
  styleUrls: ['./special-deals.component.css']
})
export class SpecialDealsComponent implements OnInit {
  // cards = [
  //   {
  //     title: 'Card Title 1',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 2',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 3',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 4',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 5',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 6',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 7',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 8',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 9',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  // ];
  // slides: any = [[]];
  // chunk(arr, chunkSize) {
  //   let R = [];
  //   for (let i = 0, len = arr.length; i < len; i += chunkSize) {
  //     R.push(arr.slice(i, i + chunkSize));
  //   }
  //   return R;
  // }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  specialDeals:specialDeals[];
  specialDealsItems: specialDeals = {
    sdId          :null,
    pID           :null,
    sdName        :null,
    sdDescription :null,
    sdImg         :null,
    status        :null,
  };
  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    // this.slides = this.chunk(this.cards, 3);
    this.apiService.readspecialDeals().subscribe((selectedItem: specialDeals[])=>{
      this.specialDeals = selectedItem;
      console.log(selectedItem);
    })
  }

}
