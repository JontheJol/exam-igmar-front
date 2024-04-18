import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TokenService } from '../../token.service';
import { Game } from '../../models/Game.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../buttons/button/button.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {

  games: Game[] = [];
  gigaerror: any;
  gamedata : [{id:number,player1:string}];

  logs!: any[];//para probar que se esten trayendo los logs
  constructor(private single: TokenService) {

  }

  ngOnInit() {
    this.single.getRequestWithToken("index").subscribe(data   => {
      data.partidas;
      for (let i = 0; i < data.partidas.length; i++) {

      }

     this.games.id = data.partidas;
    },
    error => {

      console.log(error);
    });
  }

  createGame() {
    // Implement logic for creating a new game (optional)
  }

  joinGame(gameId: number) {
    // Implement logic for joining an existing game
  }
  viewScores()
  {

  }

}
