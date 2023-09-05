import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor(private http: HttpClient) {}

  getRequest(requestType: string) {
    return this.http.get(`../assets/mocks/${requestType}.json`);
  }

  // getAllRequestTypes() {
  //   return ;
  // }
}
