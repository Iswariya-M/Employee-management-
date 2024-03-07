import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  employeeData = {
    name: '',
    employee_id: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: 0,
    email: '',
    number: ''
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  submitEmployeeData() {
    this.employeeService.saveEmployeeData(this.employeeData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/next-page']);
      });
  }
}