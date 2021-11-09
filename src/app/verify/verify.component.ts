import { Component, OnInit } from '@angular/core';

import { data, post } from 'jquery';
import {HttpClient} from '@angular/common/http'
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidationErrors ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  isvalid= undefined;
  data ={valid: "", number: "", local_format: "", international_format: "", country_prefix: "",country_code:"",country_name:"",carrier:"",
  line_type:"",error:""}
  error:{info:""}
  country_codes= [];
  errror=false;
  lessthen_8 =false;
  morethen_10=false;
  image:string="assets/images/phone.jpg"
  

    registerForm= new FormGroup({
    'country': new FormControl(null, [Validators.required]),
    'number': new FormControl(null,[Validators.required,
      Validators.pattern("^[0-9]*$"),
    Validators.minLength(8),Validators.maxLength(10)]),
    
  });
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
 
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  constructor(private fb: FormBuilder) {}
 
  onSubmit(): void {
    this.submitted = true;

     var country =this.registerForm.get('country').value;
     var number =this.registerForm.get('number').value ;
     if (!(typeof number === "number" )){
      this.errror = true;
      return;
  }
  if (!(number.toString().length  >=8)) {
    this.lessthen_8 = true;
   return;
}
if (number.toString().length > 10) {
  this.morethen_10 = true;
  return;
}
     var access_key = 'eb588dbf70cb81df1c8d374269db9d18';
     fetch('http://apilayer.net/api/validate?access_key=' + access_key + '&number=' + number + '&country_code='+ country ).then(res=>{
        return res.json();
  
       }).then(data =>{this.isvalid = data.valid
     
       
         this.data = data ;})
         console.log(this.data)


       
       
  }
  get f(): { [key: string]: any } {

    var x = this.registerForm.get('number');
  
    return x
  
  }
 
  ngOnInit(): void {
   
    this.registerForm= new FormGroup({
      'country': new FormControl(null, [Validators.required]),
      'number': new FormControl(null,[Validators.required,
        Validators.pattern("^[0-9]*$"),
      Validators.minLength(8),Validators.maxLength(10)]),
      
    });
    console.log(this.registerForm.controls)
    console.log(this.registerForm.get('number').errors)
    
  }
  ngAfterContentInit() :void{
    fetch('https://restcountries.com/v2/all').then(res =>{
      return res.json();
    }).then(data =>{data.forEach(element => {this.country_codes.push(element.alpha2Code)
         
    });})
      

  }
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
    
  }

  
  
  get numberp() {
    return this.registerForm.get('number');
  }
   
 

  


  
    


   
  


}

