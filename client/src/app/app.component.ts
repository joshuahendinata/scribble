import { Component } from '@angular/core';
import { RequestItemDetailComponent } from './request-item/request-item-detail.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Service Request Management System';
  renderAddRequest: boolean;
  renderAddSr: boolean;

  onActivate(component) {
    // render if add request widget is not rendered yet
    this.renderAddRequest = !(component instanceof RequestItemDetailComponent);
  }

  onDeactivate(component) {
    console.log(component);
  }

  onNotifyAppComponent(component){
    alert('BEFORE');
    console.log('BEFORE');
    console.log(component);
  }

}
