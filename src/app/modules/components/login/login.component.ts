import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService) {

  }


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      usrPass: new FormControl('', [Validators.required])
    });
  }

  cleanForm(): void {
    this.initializeForm();
  }

  submit(): void {
    const formControls = this.form.controls;
    const data = {
      email: formControls['email'].value,
      usrPass: formControls['usrPass'].value
    }
    this.userService.authUser(data).subscribe((res: any) => {
      if (res.message === "Usuario encontrado") {
        localStorage.setItem('user',JSON.stringify(res.user));
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        setTimeout(() => {
          this.router.navigate(['/event']);
        }, 1000);
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        setTimeout(() => {
          this.cleanForm();
        }, 1000);
      }
    });
  }

  registerUser(): void {
    this.router.navigate(['/user'])
  }

}
