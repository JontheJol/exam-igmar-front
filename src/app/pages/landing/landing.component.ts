import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { TokenService } from '../../token.service';
import { Game } from '../../models/Game.model';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../buttons/button/button.component';
import { routes } from '../../app.routes';

import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
import { GameComponent } from '../game/game.component'


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
  id_partida = ""


  logs!: any[];//para probar que se esten trayendo los logs
  appaer: boolean = false

  constructor(private single: TokenService, private router: Router,private game: GameComponent){


    Pusher.logToConsole = true;
    var pusher = new Pusher('b5bcbb60477b643ab290', {
      cluster: 'us2'
    });


    let self = this;
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data:any) {
      self.appaer = true;
      console.log("Prueba_landing");
//quiero que se actualice la tabla de juegos
      self.loadTableData();
    });

  }

  

  ngOnInit() {
    this.loadTableData()
    // this.single.getRequestWithToken("api/index").subscribe((data :any )  => {
    //   console.log(data);
    //   this.gigaerror = data.prueba as String;

    //    for (let i = 0; i <( data.partidas.length as number); i++) {
    //      this.juego = new Game(data.partidas[i].id, data.partidas[i].player1);
    //      this.games.push(this.juego);
    //    }

    // });
  }
  loadTableData() {
    this.single.getRequestWithToken("api/index").subscribe((data :any )  => {
      console.log(data);
      this.gigaerror = data.prueba as String;

      // Limpiar la lista de juegos antes de agregar los nuevos juegos
      this.games = [];

      for (let i = 0; i <( data.partidas.length as number); i++) {
        this.juego = new Game(data.partidas[i].id, data.partidas[i].player1);
        this.games.push(this.juego);
      }
    });
  }

  createGame() {
    console.log("aquiii")
    this.single.sendRequestWithToken("api/createGame", {}).subscribe(
      (data: any) => {
        // Navega a la ruta '/game' solo si la creación del juego es exitosa
        console.log("exitus")
        this.router.navigate(['/game']);
      },
      (error: any) => {
        // Maneja el error aquí...
        alert('¡Error en el juego intenta de nuevo!');

        console.error('Hubo un error al crear el juego:', error);
      }
    );
  }

  joinGame(gameId: string) {
    this.single.sendRequestWithToken('api/joinGame/',{"id": gameId}).subscribe(
      (data: any) => {
        // Guarda el ID del juego y los barcos en el localStorage
        // localStorage.setItem('gameId', gameId);
        // localStorage.setItem('boats', JSON.stringify(data.boats));

        // Navega a la página de posicionamiento de barcos
        // this.router.navigate(['/game']);
        this.game.id_partida = gameId;
        this.router.navigate(['/game']);
        
      },
      (error: any) => {
        console.error('Hubo un error al unirse al juego:', error);
      }
    );
  }


}
