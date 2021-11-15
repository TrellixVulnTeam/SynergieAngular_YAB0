import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/admin-login.service';
@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  isHide = true;
  formValid = false;
  title!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AdminLoginService
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.formValid = true;
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      try {
        // LOGIN OK
        await this.authService.login(email, password);

        this.router.navigate(['dashboard']);
        this.authService.showNotification(`Vous êtes connecté(e) !`);
      } catch (error) {
        //ERREUR
        this.formValid = false;
        this.authService.showNotification(
          `Une erreur s'est produite, ${error}`
        );
      }
    }
  }
}
