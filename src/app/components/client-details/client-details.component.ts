import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Clients } from '../../models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Clients;
  hasBoolean:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(
    public clientservice: ClientService,
    public router: Router,
    public flash: FlashMessagesService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
    //Get the Id 
    this.id = this.route.snapshot.params['id'];
    this.clientservice.getClient(this.id).subscribe(client => {
      if(client.balance > 0){
        this.hasBoolean = true;
      }
      this.client = client;
    });
  }
  updateBalance(id:string){
    this.clientservice.updateBalance(this.id, this.client);
    this.flash.show('Balance Updated', {cssClass : 'alert-success', timeout : 4000});
    this.router.navigate(['/clients-details/' + this.id]);
  }
  onDeleteClient(id:string){
    if(confirm('Do you want this client to be Deleted ?')){
    this.clientservice.deleteClient(this.id);
    this.flash.show('Client Deleted', {cssClass : 'alert-success', timeout : 4000});
    this.router.navigate(['/']);
  }
}
}
