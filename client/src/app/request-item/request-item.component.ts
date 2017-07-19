import { Component, OnInit } from '@angular/core';
import { RequestItemService } from './request-item.service';
import { RequestItem } from './request-item.to';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.css'],
  providers: [RequestItemService]
})
export class RequestItemComponent implements OnInit {

  shownList: RequestItem[];

  constructor(private requestItemSvc : RequestItemService) { 
    requestItemSvc.getRequestItems().subscribe(requestItems => {
      this.shownList = requestItems;
    });
  }

  ngOnInit() {
  }

}
