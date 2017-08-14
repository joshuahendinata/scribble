import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { RequestItemService } from './request-item.service';
import { RequestItem } from './request-item.to';
import { RequestItemDetailComponent } from './request-item-detail.component';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.css'],
  providers: [RequestItemService]
})
export class RequestItemComponent implements OnInit, AfterViewInit {

  renderRequestDetail: boolean;
  shownList: RequestItem[];
  queryParam: any;
  requestIdsSelectionForSr: Map<number, boolean> ;

  // Annotation to tell angular to keep looking for a component. look for ngAfterViewInit()
  @ViewChildren("requestItemDetailComponent")
  private requestItemDetailComponentList: QueryList<RequestItemDetailComponent>;

  private requestItemDetailComponent: RequestItemDetailComponent;

  constructor(private requestItemSvc: RequestItemService) {
    this.queryParam = {};
    this.queryParam.limit = 10;
    this.queryParam.skip = 0;
    this.queryParam.totalItem = 0;
    this.queryParam.activePage = 1;
    this.queryParam.pageNo = [];

    this.findRequestItemByCriteria();
    this.renderRequestDetail = false;
    this.requestIdsSelectionForSr = new Map<number, boolean>();
  }


  ngAfterViewInit(): void {

    // Once requestItemDetail Component is found, immediately store into local variable for reference
    this.requestItemDetailComponentList.changes.subscribe((comps: QueryList<RequestItemDetailComponent>) => {
      console.log(comps);
      this.requestItemDetailComponent = comps.first;
    });

  }

  onNextPage() {
    if (this.queryParam.activePage == this.queryParam.pageNo.length) {
      return;
    }
    this.queryParam.activePage += 1;
    this.queryParam.skip = (this.queryParam.skip + Number(this.queryParam.limit));
    this.findRequestItemByCriteria();
  }

  onPrevPage() {
    if (this.queryParam.activePage == 1) {
      return;
    }
    this.queryParam.activePage -= 1;
    this.queryParam.skip = (this.queryParam.skip - Number(this.queryParam.limit));
    this.findRequestItemByCriteria();
  }

  onPageSizeChange(component) {
    this.queryParam.skip = 0;
    this.queryParam.activePage = 1;
    this.findRequestItemByCriteria();
  }

  onPageNoChange(pageNo) {
    this.queryParam.skip = (pageNo - 1) * Number(this.queryParam.limit);
    this.queryParam.activePage = pageNo;
    this.findRequestItemByCriteria();
  }

  findRequestItemByCriteria() {
    this.requestItemSvc.getRequestItems(this.queryParam).subscribe(res => {
      this.shownList = res.json();
      console.log("res");
      console.log(res);
      this.queryParam.totalItem = res.headers['_headers'].get('content-range')[0].split('/')[1];
      this.queryParam.pageNo = Array.from(Array(Math.ceil(this.queryParam.totalItem / this.queryParam.limit)), (x, i) => i + 1);
    },
      err => {
        this.shownList = new Array<RequestItem>();
      }
    );
  }

  ngOnInit() {
  }

  updateRequestDetail(updatedRequest: RequestItem) {
    this.renderRequestDetail = true;

    setTimeout(() => { // ES6 workaround of function() to reference 'this'
      this.requestItemDetailComponent.initUpdateRequestDetail(updatedRequest);
    }, 1);
  }

  onAddRequestClick(component) {
    this.renderRequestDetail = true;
  }

  /**
   * Called when requestDetail is closed upon clicking submit or cancel
   */
  onRequestDetailClosed(component) {
    console.log("onRequestDetailClosed");
    console.log(component);

    if (component != null && component.requestObject != null) {

      if (component.addIndicator) {
        //example: totalItem: 10, last page is full, and we add 1 item, need to skip until the new page
        if (this.queryParam.totalItem == (Number(this.queryParam.limit) * this.queryParam.pageNo.length)) {
          this.queryParam.skip = (Number(this.queryParam.limit) * this.queryParam.pageNo.length);
          this.queryParam.activePage = this.queryParam.pageNo.length + 1;
        }
        this.findRequestItemByCriteria();
      }
    }
    this.renderRequestDetail = false;
    this.queryParam.queryObject = null;
  }

  onSearchRequestClick(component) {
    this.renderRequestDetail = true;
    setTimeout(() => { // ES6 workaround of function() to reference 'this'
      this.requestItemDetailComponent.initSearchRequest();
    }, 1);
  }

  onSearchProcessClicked(queryObject: RequestItem) {
    this.queryParam.skip = 0;
    this.queryParam.activePage = 1;
    this.queryParam.queryObject = queryObject;
    this.findRequestItemByCriteria();
  }


  deleteRequestItem(deletedRequest: RequestItem) {
    var confirmDelete = confirm("Are you sure?");

    if (confirmDelete) {
      this.requestItemSvc.deleteRequestItem(deletedRequest).subscribe(
        () => {

          for (var i = 0; i < this.shownList.length; i++)
            if (this.shownList[i]._id === deletedRequest._id) {
              this.shownList.splice(i, 1);
              break;
            }
        });
    }

    this.renderRequestDetail = false;
  }


  addRequestToSelection(selectedRequest: RequestItem, eventComponent){
    console.log("selectedRequest._id:" + selectedRequest._id);
    console.log("eventComponent.target.checked:" + eventComponent.target.checked);

    this.requestIdsSelectionForSr.set(selectedRequest._id, eventComponent.target.checked);
  }

  initCreateSR(){
    console.log("this.requestIdsSelectionForSr");
    console.log(this.requestIdsSelectionForSr);
  }
}
