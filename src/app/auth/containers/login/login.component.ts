import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import pageSettings from '../../../../config/page-settings';
import { Node } from '../../models/node';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  pageSettings = pageSettings;
  nodes: Node[];
  nodesSub: Subscription;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
  ) {
    this.pageSettings.pageEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnInit() {
    this.nodesSub = this.authService.getNodes().subscribe((nodes) => {
      this.nodes = nodes;
    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nodeid: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
    this.nodesSub.unsubscribe;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService
      .login({
        nodeId: this.f.nodeid.value,
        userName: this.f.username.value,
        password: this.f.password.value,
      })
      .subscribe((success) => {
        if (success) {
          this.router.navigate(['/dashboard-kpis']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario y/o constraseña incorrectos',
            footer: 'Consulte con el administrador',
          });
        }
      });
  }
}
