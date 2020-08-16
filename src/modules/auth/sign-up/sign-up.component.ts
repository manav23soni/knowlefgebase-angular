import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../_services/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signupForm: FormGroup;
  public isSubmitted = false;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public activateRoute: ActivatedRoute,
    private authService: UserService
  ) { }

  ngOnInit() {
    this.resetSignUpForm();
  }

  resetSignUpForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  get signupFormControls() { return this.signupForm.controls; }

  async submitSignupForm(value) {
    try {
      this.isSubmitted = true;
      if (this.signupForm.invalid) {
        return;
      }
      const loginResult = await this.authService.register(value);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
    }
  }
}
