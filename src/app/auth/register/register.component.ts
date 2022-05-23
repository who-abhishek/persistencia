import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});
  public errorMessage: string = '';
  public confirmPasswordError: string = '';

  public get getControls(): any {
    return this.registerForm.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: [''],
      confirmPassword: [''],
    });
  }

  public submit(): boolean {
    this.confirmPasswordError = '';
    this.errorMessage = '';
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return false;
    }

    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      this.confirmPasswordError = 'Password and confirm password should be same.';
      return false;
    }

    return false;
  }

  public findInvalidControls(): any {
    const invalid = [];
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
