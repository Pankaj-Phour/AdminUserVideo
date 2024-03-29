import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  Login:FormGroup;
  Submit:boolean  =false;
  form:FormGroup;
  otploginForm:FormGroup;
  OTPLogin:boolean = false;
  OTP:boolean = false;
  constructor(private router:Router,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    this.new();
    localStorage.setItem('selected','login');
    this.validation()
  }
  Log(e:any){
    console.log("Welcome to Login " + e);

  }
  validation(){
    this.Login = this.fb.group({
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('',Validators.required)
    });
     
    this.otploginForm = this.fb.group({
      email : new FormControl('',Validators.compose([Validators.required,Validators.email])),
    });
  }
  submit(){
    localStorage.setItem('submit','true');
    this.Submit = true;
    setTimeout(()=>{
      this.Submit = false;
    },2000)
    if(this.Login.valid){
      if(this.Login.value.email !== 'pankaj.phour70@gmail.com' || this.Login.value.password !== 'Pankaj@123'){
        console.log("Invalid user");
      }else{
        localStorage.setItem('logged_in','true')
        this.router.navigate(['/dashboard'])
      }
    }
  }

  emailSubmit(){
    if(this.otploginForm.valid){
      this.OTP = true;
    }
    else{
      this.OTP = false;
    }
  }

  new(){
    this.form= new FormGroup({
      age : new FormControl ('',Validators.required),
      gender:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
    })
    let obj = {
      age:12,
      gender:'Male',
      name: 'Pankaj',
      // email: 'pankaj@pankaj.com'
    }
    let obj2 = {
      age:22,
      gender:'Female',
      zipCode:'231232'
    }
    // this.form.setValue(obj);
    
    this.form.patchValue(obj2)
    console.log(this.form);
  }

  otpLogin(){
    console.log("OTP login clicked ");
    this.OTPLogin = !this.OTPLogin;
  }
}
