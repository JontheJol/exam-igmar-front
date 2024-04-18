import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { TokenService } from '../../token.service';
import { Game } from '../../models/Game.model';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../buttons/button/button.component';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgFor,CommonModule, RouterModule,RouterLink, ButtonComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {

  games: Game[] = [];
  juego:Game = new Game(0, "");
  gigaerror: any;

  logs!: any[];//para probar que se esten trayendo los logs
  constructor(private single: TokenService) {

  }

  ngOnInit() {
    this.single.getRequestWithToken("api/index").subscribe((data :any )  => {
      console.log(data);
      this.gigaerror = data.prueba as String;

       for (let i = 0; i <( data.partidas.length as number); i++) {
         this.juego = new Game(data.partidas[i].id, data.partidas[i].player1);
         this.games.push(this.juego);
       }

    });
  }

  createGame() {

    this.single.sendRequestWithToken("api/createGame", {}).subscribe((data: any) => {
      console.log("lop")

    });

  }

  joinGame(gameId: number) {
this.single.sendRequestWithToken("api/joinGame", {gameId: gameId}).subscribe((data: any) => {
console.log("exitus")
  });
}

  viewScores()
  {

  }

}
