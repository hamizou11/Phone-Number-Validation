import { Component, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {  }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
 
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

 
  

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        phonenumber : ['',[Validators.required,
        Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),Validators.maxLength(10)]]
      });

      //convenience getter for easy access to form fields
      
    
   
  }
  get f(){return this.registerForm.controls}
  onSubmit (){
    this.submitted = true;
    if(this.registerForm.invalid){
      return ;
    }
  }


}
