import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RequestItemService } from './request-item.service';
import { RequestItem } from './request-item.to';
import { NgForm } from "@angular/forms";
declare var jQuery: any;

@Component({
    selector: 'request-item-detail',
    templateUrl: './request-item-detail.component.html',
    styleUrls: ['./request-item.component.css'],
    providers: [RequestItemService]
})
export class RequestItemDetailComponent implements OnInit {

    @Output() requestDetailClosedEvent: EventEmitter<any> = new EventEmitter();
    @Output() searchProcessClicked: EventEmitter<any> = new EventEmitter();
    newRequest: RequestItem;
    existingRequest: RequestItem; // item passed from requestItemComponent
    renderOverlay: boolean;
    pageFunction: string;
    queryParam : any; // passed from request-item component

    constructor(private requestItemService: RequestItemService,
        private router: Router) {

        this.renderOverlay = false;
        this.newRequest = new RequestItem();
        this.pageFunction = "Adding new request";
    }

    ngOnInit() {
    }



    requestDetailSubmit(requestItemForm: NgForm) {

        console.log("requestItemForm");
        console.log(requestItemForm.value);
        // console.log("this.newRequest");
        // console.log(this.newRequest);

        var addRequest: boolean = false;
        this.renderOverlay = true;
        if (this.newRequest._id == null || this.newRequest._id == 0) {
            addRequest = true;
        }

        this.requestItemService.saveOrUpdateRequestItem(this.newRequest).subscribe(requestItem => {
            console.log("requestDetailSubmit requestItem");
            console.log(requestItem);
            this.renderOverlay = false;
            this.newRequest = requestItem;
            this.requestDetailClosedEvent.emit({
                requestObject: this.newRequest,
                addIndicator: addRequest
            });

            // if update, update the record in list
            if (!addRequest) {
                // copy all attributes to reference in the list
                for (var k in this.newRequest) {
                    this.existingRequest[k] = this.newRequest[k];
                }
            }
        },
            err => {
                console.log(err)
            }
        );
    }

    closeRequestDetail() {
        
        this.pageFunction = null;
        this.requestDetailClosedEvent.emit(null);
    }

    initUpdateRequestDetail(requestDetailItem: RequestItem) {
        console.log("initUpdateRequestDetail requestItem");
        console.log(requestDetailItem)
        this.existingRequest = requestDetailItem; // cache the existing one
        this.newRequest = jQuery.extend(true, {}, requestDetailItem); // clone the passed object
        this.pageFunction = "Updating Request ID: " + this.newRequest._id;
    }

    initSearchRequest(){
        this.pageFunction = "Search Request";
        this.newRequest = new RequestItem();
    }

    searchRequestDetail(){
        this.searchProcessClicked.emit(this.newRequest);
    }
}
