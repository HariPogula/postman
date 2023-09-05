import { Component, OnInit } from '@angular/core';
import { MockService } from './mock.service';
import { Observable, take, tap } from 'rxjs';
import { RequestTypes } from './requests.enum';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedRequest?: any;

  filteredRequestTypes!: any[];
  allRequestTypes$: Observable<any> | undefined;
  requestTypes: any;
  sampleResponse$: Observable<any> | undefined;
  isSampleDataEmpty: boolean = true;
  constructor(private mockService: MockService) {}

  ngOnInit() {
    this.getAllRequestTypes();
  }

  getAllRequestTypes() {
    this.allRequestTypes$ = this.mockService.getRequest(
      RequestTypes.ALL_REQUESTS
    );
    this.allRequestTypes$
      .pipe(
        take(1),
        tap((res) => {
          this.requestTypes = res;
        })
      )
      .subscribe();
  }

  getResponseByRequestType() {
    this.sampleResponse$ = this.mockService.getRequest(
      this.selectedRequest?.requestType
    );
    this.isSampleDataEmpty = false;
  }

  resetRequest() {
    this.isSampleDataEmpty = true;
    this.selectedRequest = '';
  }

  filterRequestTypes(event: AutoCompleteCompleteEvent) {
    let filteredRequests: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.requestTypes as any[]).length; i++) {
      let request = (this.requestTypes as any[])[i];
      if (
        request.requestTitle.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filteredRequests.push(request);
      }
    }

    this.filteredRequestTypes = filteredRequests;
  }
}
