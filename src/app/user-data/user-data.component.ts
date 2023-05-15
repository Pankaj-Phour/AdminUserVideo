import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  data:any;
search:FormGroup;
original:any;
videoUrl:any;
lon:any;
video:boolean = false;
lat:any;
noData:boolean = false;
dashboard:boolean = false;
  constructor(private api:ApiService,
    private router:Router
    ) { }


  Log(e:any){
    console.log("Welcome to dashboard " + e);
    
  }
  ngOnInit(): void {
    localStorage.setItem('selected','dashboard');

    this.dashboard = true;

    this.validation()
    this.api.getUser('/allUsersVideos').subscribe((e:any)=>{
      // console.log(e);
      this.original = e.response;
      this.data = e.response;
    })
  }

  validation(){
    this.search = new FormGroup({
      name: new FormControl('',Validators.required)
    })
  }

input(event:any){
  let e = event.value;
  this.data = this.original;
  let value = e.toLowerCase();
  // let typeOfValue = Number(value)
  // typeOfValue*0 == 0 ? this.data = this.data.filter((e:any)=>{
  //   return e.id.includes(value)
  // })
  // : 
  this.data =  this.data.filter((a:any)=>{
    return a.name.toLowerCase().includes(value)
  })
  if(value.length<1){
    this.data = this.original;
  }
  if(this.data.length<1){
    this.noData = true
  }else{
    this.noData = false;
  }
}

map(id:any){
  this.api.getuserVideo(`/userVideo?id=${id}`).subscribe((data:any)=>{

    this.videoUrl = data.response.data
  })
  this.video = true;
}
}
