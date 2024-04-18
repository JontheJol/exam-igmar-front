import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { CommonModule } from '@angular/common';
import { NavbarDashComponent } from '../navbar-dash/navbar-dash.component';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
  imports: [CommonModule, NavbarDashComponent],
  // providers: [TokenService],
  standalone  : true
})
export class LogListComponent implements OnInit {

  logs!: any[];
  limit = 10;

  constructor(private logService: TokenService) { }

  ngOnInit(): void {
    this.getLogData();
    // setInterval(() => {
    //   this.getLogData();
    // }, 5000); //funciona pero cada vez que se hace una peticion se guarda eso y se ve mal en la vista
  }

  getLogData() {
    this.logService.getRequestWithToken('https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/logs/index').subscribe(
      data => {
        this.logs = data as [Object[]];
        // console.log(this.logs);
        // console.log(this.logs[0].id);
      },
      error => {
        console.log(error);
      }
    );
  }

}
