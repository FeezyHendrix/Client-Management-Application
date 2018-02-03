import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Clients } from '../../models/client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client: Clients = {
    firstname : '',
    lastname: '',
    email: '',
    phone: '',
    balance:0
  }
  disableBalanceOnEdit:boolean = true;
  constructor(
    public clientservice: ClientService,
    public router: Router,
    public flash: FlashMessagesService,
    public route : ActivatedRoute,
    public settings: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientservice.getClient(this.id).subscribe(client => {
    console.log(client);  
    this.client = client;
    });
    this.disableBalanceOnEdit = this.settings.getSettings().disableBalanceOnEdit;
  }
  onSubmit({value, valid} : {value: Clients, valid:boolean}){
    console.log(value);
    if(!valid){
      this.flash.show('Some Fields Are Required', {cssClass : 'alert-danger', timeout: 4000});
      this.router.navigate(['/edit-client/' + this.id]);
    }else{
      //add new client
      this.clientservice.updateClient(this.id,value);
      this.flash.show('Successfully added new client', {cssClass : 'alert-success', timeout: 4000});
      this.router.navigate(['/client-details/' + this.id]);
    }
  }

}
