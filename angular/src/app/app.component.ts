import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentPage = 1;
  formData: any = {};
  employeeDetails: any;

  constructor(private http: HttpClient,private router: Router) {}

  next() {
    if (this.validateStepOne()) {
      this.currentPage++;
    }
  }

  // submit() {
  //   if (this.validateStepTwo()) {
  //     this.http.post<any>('http://localhost:3000/save-data', this.formData)
  //       .subscribe({
  //         next: response => {
  //           console.log(this.formData);
  //           console.log('Data submitted successfully:', response);
  //           alert('Data submitted successfully!');
  //         },
  //         error: (error: HttpErrorResponse) => {
  //           console.error('Error submitting data:', error);
  //           alert('Error submitting data. Please try again.');
  //         }
  //       });
  //   }
  // }

  submit() {
    if (this.validateStepTwo()) {
      this.http.post<any>('http://localhost:3000/save-data', this.formData)
        .subscribe(
          (response) => {
            console.log('Data saved successfully:', response);
            alert('Data saved successfully');
            this.clearFormData();
          },
          (error) => {
            console.error('Error saving data:', error);
            if (error.error && error.error.error === 'Email or employee ID already exists') {
              alert('Email or employee ID already exists');
            } else {
              alert('Error saving data');
            }
          }
        );
    }
  }
  
  validateStepOne(): boolean {
    const { name, employeeId, department, dob, gender, designation, salary } = this.formData;

    if (!name || !employeeId || !department || !dob || !gender || !designation || !salary) {
      alert('Please fill in all fields.');
      return false;
    }

    if (!/^[a-zA-Z\s]*$/.test(name)) {
      alert('Name should only contain alphabets.');
      return false;
    }

    if (new Date(dob).getFullYear() > 2007) {
      alert('Date of birth invalid.');
      return false;
    }

    if (isNaN(Number(salary))) {
      alert('Salary should be a number.');
      return false;
    }
    if (Number(salary) < 0) {
      alert('Salary cannot be negative.');
      return false;
    }
    if (Number(employeeId) < 0) {
      alert('Employee id cannot be negative.');
      return false;
    }

    return true;
  }

  validateStepTwo(): boolean {
    const { email, number } = this.formData;

    if (!email || !number) {
      alert('Please fill in all fields.');
      return false;
    }

    if (!this.validateEmail(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (!/^\d{10}$/.test(number)) {
      alert('Number should be 10 digits.');
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  clearFormData(): void {
    // Reset form fields to empty strings or default values
    this.formData.name = '';
    this.formData.employeeId = '';
    this.formData.department = '';
    this.formData.dob= '';
    this.formData.gender= '';
    this.formData.designation='';
    this.formData.salary= '';
    this.formData.email= '';
    this.formData.number= '';
  }

  viewDetails() {
    this.http.get<any>('http://localhost:3000/employee-details')
      .subscribe(
        (response) => {
          this.employeeDetails = response;
          this.router.navigate(['/employee-details']);
        },
        (error) => {
          console.error('Error fetching employee details:', error);
          alert('Error fetching employee details');
        }
      );
  }
}