import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

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
loader:boolean = false;
  constructor(private api:ApiService,
    private router:Router,
    private dialog:MatDialog
    ) { }


  Log(e:any){
    // console.log("Welcome to dashboard " + e);
    
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

// Code of this function is modified and written again below to open dialog for plaing video 
// map(id:any){
//   this.api.getuserVideo(`/userVideo?id=${id}`).subscribe((data:any)=>{

//     this.videoUrl = data.response.data
//   })
//   this.video = true;
// }


watchVideo(id:any){
  console.log(id)
  this.loader = true;
  this.api.getuserVideo(`/userVideo?id=${id}`).subscribe((next:any)=>{
    this.loader = false
    // console.log(next);
    this.dialog.open(watchVideoComponent,{
     data : next.response,
     
    })
  })
}
}


@Component({
  selector : 'app-user-data',
  templateUrl : './watchVideo.html',
  styleUrls : ['./user-data.component.scss']
})

export class watchVideoComponent implements OnInit {
  previewUrl:any;
  iframe:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private sanitizer:DomSanitizer){
    
  }  
  ngOnInit(): void {
      console.log("Hello from watchVideo",this.data);
      if(this.data.data.includes('view?usp=drivesdk')){
        this.iframe = true;
        this.previewUrl = this.data.data.substring(0,this.data.data.length-17) + 'preview';
        console.log(this.previewUrl);
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.previewUrl)
      }
      else{
        this.iframe = false;
        this.previewUrl = this.data.data;
      }
      console.log(this.previewUrl);
      
      
  }
}