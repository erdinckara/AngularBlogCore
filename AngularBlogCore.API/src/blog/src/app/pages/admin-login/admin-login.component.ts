import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    this.authService.isAuthenticated(email, password).subscribe(data =>{
      if (data.status == true) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        this.router.navigate(["/admin"]);
      } else {
        alert("Email or password is wrong");
      }
    });
  }

}
