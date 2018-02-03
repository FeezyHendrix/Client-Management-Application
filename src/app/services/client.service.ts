import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated' ;
import { Observable } from 'rxjs';
import { Clients } from '../models/client';


@Injectable()
export class ClientService {
  client: FirebaseObjectObservable<any>;
  clients: FirebaseListObservable<any[]>;

  constructor (public af:AngularFireDatabase) { 
    this.clients = this.af.list('clients') as FirebaseListObservable<Clients[]>
  }
  getClients(){
    return this.clients;
  }
  newClient(client: Clients){
    this.clients.push(client);
  }

  getClient(id: string){
    this.client = this.af.object('/clients/' + id) as FirebaseObjectObservable<Clients>;
    return this.client;
  }
  updateBalance(id:string, client:Clients){
    return this.clients.update(id, client);
  }
  deleteClient(id:string){
    this.clients.remove(id);
  }
  updateClient(id:string, client:Clients){
    return this.clients.update(id,client);
  }
}
