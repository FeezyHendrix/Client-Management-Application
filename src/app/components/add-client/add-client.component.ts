import { Component, OnInit } from '@angular/core';
import { Clients } from '../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Clients = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    balance:0
  }
  disableBalanceOnAdd:boolean = false;
  constructor(
    public  flash: FlashMessagesService, 
    public router: Router, 
    public clientService: ClientService,
    public settings: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settings.getSettings().disableBalanceOnAdd;
  };
  onSubmit({value, valid} : {value: Clients, valid:boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    if(!valid){
      this.flash.show('Some Fields Are Required', {cssClass : 'alert-danger', timeout: 4000});
      this.router.navigate(['add-client']);
    }else{
      //add new client
      this.clientService.newClient(value);
      this.flash.show('Successfully added new client', {cssClass : 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
