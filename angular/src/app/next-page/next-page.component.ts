import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrl: './next-page.component.css'
})
export class NextPageComponent{
  nextPageData = {
    email: '',
    number: ''
  };

  constructor(private employeeService: EmployeeService,private router: Router, private http: HttpClient) {}

  submitNextPageData() {
    this.employeeService.saveEmployeeData(this. nextPageData)
      .subscribe(response => {
        console.log(response);
        
      });
  }
}