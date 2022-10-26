import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements  OnInit {
@Input() videoUrl;
  ngOnInit(): void {
      console.log("Hello");
      
  }


}

