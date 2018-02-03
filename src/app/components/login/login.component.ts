import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Clients } from '../../models/client';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  
  constructor(
    private auth: AuthServiceService,
    public flash: FlashMessagesService,
    public route: Router,
  ) { }


  ngOnInit() {
  }
  onSubmit(){
    this.auth.login(this.email, this.password)
    .then((res) => {
      this.flash.show('Login Succesful', {cssClass : 'alert-success', timeout : 4000});
      this.route.navigate(['/']);
    })
    .catch((err) => {
      this.flash.show( err.message, {cssClass : 'alert-success', timeout : 4000});
      this.route.navigate(['/login']);
      
    })
  }
}
