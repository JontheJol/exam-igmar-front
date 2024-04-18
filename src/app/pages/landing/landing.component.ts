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
  gigaerror: any;

  logs!: any[];//para probar que se esten trayendo los logs
  constructor(private single: TokenService) {

  }

  ngOnInit() {
    this.single.getRequestWithToken("index").subscribe((data :any )  => {
      for (let i = 0; i < data.partidas.length; i++) {
        this.games.push(new Game(data.partidas[i].id, data.partidas[i].player1));
      }

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
