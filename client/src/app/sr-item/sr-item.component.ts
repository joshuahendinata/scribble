import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { SrItemService } from './sr-item.service';
import { SrItemDetailComponent } from './sr-item-detail.component';
import { SrItem } from './sr-item.to';

@Component({
  selector: 'app-sr-item',
  templateUrl: './sr-item.component.html',
  styleUrls: ['./sr-item.component.css'],
  providers: [SrItemService]
})
export class SrItemComponent implements OnInit {

  renderSrDetail: boolean;
  queryParam: any;
  srShownList: SrItem[];

  // Annotation to tell angular to keep looking for a component. look for ngAfterViewInit()
  @ViewChildren("SrItemDetailComponent")
  private srItemDetailComponentList: QueryList<SrItemDetailComponent>;

  private srItemDetailComponent: SrItemDetailComponent;

  constructor(private srItemSvc: SrItemService) {

    this.queryParam = {};
    this.queryParam.limit = 10;
    this.queryParam.skip = 0;
    this.queryParam.totalItem = 0;
    this.queryParam.activePage = 1;
    this.queryParam.pageNo = [];
    this.findSrItemByCriteria();

    this.renderSrDetail = false;
  }

  ngAfterViewInit(): void {

    // Once requestItemDetail Component is found, immediately store into local variable for reference
    this.srItemDetailComponentList.changes.subscribe((comps: QueryList<SrItemDetailComponent>) => {
      console.log(comps);
      this.srItemDetailComponent = comps.first;
    });

  }

  onNextPage() {
    if (this.queryParam.activePage == this.queryParam.pageNo.length) {
      return;
    }
    this.queryParam.activePage += 1;
    this.queryParam.skip = (this.queryParam.skip + Number(this.queryParam.limit));
    this.findSrItemByCriteria();
  }

  onPrevPage() {
    if (this.queryParam.activePage == 1) {
      return;
    }
    this.queryParam.activePage -= 1;
    this.queryParam.skip = (this.queryParam.skip - Number(this.queryParam.limit));
    this.findSrItemByCriteria();
  }

  onPageSizeChange(component) {
    this.queryParam.skip = 0;
    this.queryParam.activePage = 1;
    this.findSrItemByCriteria();
  }

  onPageNoChange(pageNo) {
    this.queryParam.skip = (pageNo - 1) * Number(this.queryParam.limit);
    this.queryParam.activePage = pageNo;
    this.findSrItemByCriteria();
  }

  findSrItemByCriteria() {
    this.srItemSvc.getSrItems(this.queryParam).subscribe(res => {
      this.srShownList = res.json();
      console.log("res");
      console.log(res);
      this.queryParam.totalItem = res.headers['_headers'].get('content-range')[0].split('/')[1];
      this.queryParam.pageNo = Array.from(Array(Math.ceil(this.queryParam.totalItem / this.queryParam.limit)), (x, i) => i + 1);
    },
      err => {
        this.srShownList = new Array<SrItem>();
      }
    );
  }


  ngOnInit() {
  }

  deleteSrItem(deletedSr: SrItem) {
    var confirmDelete = confirm("Are you sure?");

    if (confirmDelete) {
      this.srItemSvc.deleteSrItem(deletedSr).subscribe(
        () => {

          for (var i = 0; i < this.srShownList.length; i++)
            if (this.srShownList[i]._id === deletedSr._id) {
              this.srShownList.splice(i, 1);
              break;
            }
        });
    }

    this.renderSrDetail = false;
  }
}
