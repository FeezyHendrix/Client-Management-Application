import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { SettingsService } from '../../services/settings.service';
import { Settings} from '../../models/settings';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  setting: Settings;
  constructor(
    public router: Router,
    public flash: FlashMessagesService,
    public settings: SettingsService
  ) { }

  ngOnInit() {
    this.setting = this.settings.getSettings();
  }
  onSubmit(){
    this.settings.changeSettings(this.setting);
    this.flash.show('Settings Saved', {cssClass : 'alert-success', timeout: 4000});
    this.router.navigate(['/settings'])
  }

}
