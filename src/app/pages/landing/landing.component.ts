import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TokenService } from '../../token.service';
import { Game } from '../../models/Game.model';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../buttons/button/button.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgFor,CommonModule, RouterModule, ButtonComponent],
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

      // for (let i = 0; i <( data.partidas.length as number); i++) {
      //   this.juego = new Game(data.partidas[i].id, data.partidas[i].player1);
      //   this.games.push(this.juego);
      //   this.gigaerror = data.partidas[i].player1 as String;
      // }

    });
  }

  createGame() {
    this.single.sendRequestWithToken("create", {}).subscribe((data: any) => {
    });
  }

  joinGame(gameId: number) {
    // Implement logic for joining an existing game
  }
  viewScores()
  {

  }

}
