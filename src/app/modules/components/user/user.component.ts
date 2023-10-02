import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserI} from "../../../interfaces/User";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  user: UserI | undefined;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm(user?: any | undefined): void {
    this.form = this.formBuilder.group({
      id: new FormControl(user ? user.id : 0, [Validators.required]),
      fullName: new FormControl(user ? user.fullName : '', [Validators.required]),
      email: new FormControl(user ? user.email : '', [Validators.pattern(/^[(a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]*$/),
        Validators.minLength(9),
        Validators.required]),
      userName: new FormControl(user ? user.userName : '', [Validators.required]),
      usrPass: new FormControl(user ? user.usrPass : '', [Validators.required]),
      isDelete: new FormControl(user ? user.isDelete : 1, [Validators.required])
    });
  }

  cleanForm(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(0, [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.pattern(/^[(a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]*$/),
        Validators.minLength(9),
        Validators.required]),
      userName: new FormControl( '', [Validators.required]),
      usrPass: new FormControl('', [Validators.required]),
      isDelete: new FormControl(1, [Validators.required])
    });
  }

  submit() {
    const formControls = this.form.controls;
    this.loading = true;
    const data = {
      id: formControls['id'].value,
      fullName: formControls['fullName'].value,
      email: formControls['email'].value,
      userName: formControls['userName'].value,
      usrPass: formControls['usrPass'].value,
      isDelete: formControls['isDelete'].value
    }

    this.userService.registerUser(data).subscribe((res:any) => {
      if (res.message === "Usuario registrado") {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        this.messageService.add({ severity: 'warning', summary: 'warning', detail: "Error al registrar" });
        setTimeout(() => {
          this.cleanForm();
        }, 3000);
      }
      this.loading = false;
    });
  }

  backPage(): void {
    this.router.navigate(['/']);
  }
}
