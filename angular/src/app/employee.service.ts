import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  saveEmployeeData(data: any) {
    return this.http.post<any>('http://localhost:3000/employees', data);
  }
}