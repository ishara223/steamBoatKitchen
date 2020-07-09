import { Component, OnInit } from '@angular/core';
// MDB Angular Free
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md'
import { carousl,contactUsForm,getItemrequest } from  '../objects';
import { ApiServiceService } from '../api-service.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  public map: any = { lat: 51.678418, lng: 7.809007 };
  contactUsForm = new FormGroup ({
    name            : new FormControl(''),
    eMail           : new FormControl(''),
    contactNumber   : new FormControl(''),
    massage         : new FormControl(''),
    orderType       : new FormControl(''),
  });
  // oneItem:contactUsForm[];
  contactUs:  contactUsForm  = { name :  null , eMail:null, contactNumber:  null,massage:null, orderType:  null};
  markers = [];
  center: google.maps.LatLngLiteral;
  // selectedOneItem:  oneItem  = { id: null,
  //   name:  null,
  //   size:  null,
  //   price: null,
  //   discription: null,
  //   img: null}; 
  constructor(private apiService: ApiServiceService) { }
  lat = 43.736160;
  lng = -79.250420;
  ngOnInit(): void {
    // const myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    // const mapOptions = {
    //     zoom: 13,
    //     center: myLatlng,
    //     scrollwheel: false

    // };
    // const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // const Marker = new google.maps.Marker({
    //     position: myLatlng,
    //     title: 'Hello World!'
    // });
    // // To add the marker to the map, call setMap();
    // Marker.setMap(map);
  }

  submitMedicineInfo() {
    this.apiService.postMedicine(this.contactUsForm.value)
      .subscribe(
        (response) =>alert(response),
        (error) => console.log(error),
      );
      //alert(response);
  }


}
