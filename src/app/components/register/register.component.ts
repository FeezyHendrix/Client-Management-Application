import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Clients } from '../../models/client';
import { AuthServiceService } from '../../services/auth-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;

  constructor(
    private auth: AuthServiceService,
    public flash: FlashMessagesService,
    public route: Router,
  ) { }

  ngOnInit() {
  }
  onSubmit(){
    this.auth.register(this.email, this.password)
    .then((res)=> {
      this.flash.show('Registration Succesfull', {cssClass: 'alert-success', timeout : 4000});
      this.route.navigate(['/']);
    })
    .catch((err) =>{
      this.flash.show('Registration Error', {cssClass: 'alert-danger', timeout : 4000});
      this.route.navigate(['/register']);
    });
  }

}
