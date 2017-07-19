import { Component, OnInit } from '@angular/core';
import { SrItemService } from './sr-item.service';
import { SrItem } from './sr-item.to';

@Component({
  selector: 'app-sr-item',
  templateUrl: './sr-item.component.html',
  styleUrls: ['./sr-item.component.css'],
  providers: [SrItemService]
})
export class SrItemComponent implements OnInit {

  srShownList : SrItem[];

  constructor(private srItemSvc : SrItemService) {
    srItemSvc.getSrItems().subscribe(results => {
      this.srShownList = results;
    })
  }

  ngOnInit() {
  }

}
