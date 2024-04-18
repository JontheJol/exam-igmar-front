import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';

import Pusher from 'pusher-js';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {


  enemyTiles: string[][] = Array(5).fill(Array(8).fill('/src/assets/emptytile.jpeg'));
  playerTiles: string[][] = Array(5).fill(Array(3).fill('/src/assets/emptytile.jpeg'));
  appaer: boolean = false

  constructor(private http: HttpClient) {
    this.getShipCoordinates();
    Pusher.logToConsole = true;
    var pusher = new Pusher('b5bcbb60477b643ab290', {
      cluster: 'us2'
    });


    let self = this;
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event2', function(data:any) {
      self.appaer = true;
      console.log("Prueba");
      self.getShipCoordinates();
    });
  }

  getShipCoordinates() {
    this.http.get('http://127.0.0.1:8000/api/consultarCordenadas').subscribe((data: any) => {
      // Process the data and update playerTiles
      console.log(data);
      this.updatePlayerTiles([]);
    });
  }


  updatePlayerTiles(data: any) {
    // Convertir las coordenadas de la API a índices para playerTiles
    for (let coord of data) {
      let rowIndex = this.getIndexFromLetter(coord.charAt(0));
      let colIndex = Number(coord.charAt(1)) - 1;

      // Actualizar la casilla en las coordenadas dadas para mostrar un barco
      this.playerTiles[rowIndex][colIndex] = '/src/assets/boattile.jpeg';
      console.log(this.playerTiles);
    }
  }

  getIndexFromLetter(letter: string): number {
    return letter.charCodeAt(0) - 'A'.charCodeAt(0);
  }

  // SPRITES REFERENCES
  waterTiles: string[] = [
    'assets/images/oceantile.jpeg',
  ];

  // IDK if ill use this because the player doesnt see the enemy boats
  oponentBoatTiles: string = 'assets/barco(1).png';

  // Tiles stores the images and positions
  tiles: string[][] = [];
  oponentBoatPositions: boolean[][] = [];
  buttonStates: boolean[][] = [];

  ngOnInit() {
    this.initializeOponentBoard();
    // this.initializeButtonStates();

  }

  initializeOponentBoard() {
    this.drawOponentBoard();
    // this.getOponnentBoatsPositions();
    //console.log(this.tiles);
  }

  // Maybe this one goes in the game component
  getOponnentBoatsPositions() {
    // Get the oponent boats trough websocket
    // this.oponentBoatPositions = ... idk
  }

  drawOponentBoard() {
    for (let i = 0; i < 5; i++) {
      this.tiles[i] = [];

      for (let j = 0; j < 8; j++) {
        const randomIndex = Math.floor(Math.random() * this.waterTiles.length);
        this.tiles[i][j] = this.waterTiles[randomIndex];
      }
    }



  }


  // Coordinates guide
  // getLetterFromIndex(index: number): string {
  //   return String.fromCharCode(65 + index);
  // }
  //  // Método para determinar si un botón debería estar deshabilitado
  //  initializeButtonStates() {
  //   for (let i = 0; i < this.tiles.length; i++) {
  //     this.buttonStates[i] = Array(this.tiles[i].length).fill(true);
  //   }
  // }
 a = ""
 b = ""
 dig = ["A","B","C","D","E"]
 comp = []
   // Método para manejar el clic en el botón
  handleClick(rowIndex: number, colIndex: number) {
    // Deshabilitar el botón una vez que se hace clic en él
    this.a = this.dig[rowIndex] ;
    this.b = colIndex.toString();
    console.log(this.a + this.b)

  }

  // handleClick2() {
  //   console.log("rellenando");
  //   this.updatePlayerTiles(['A1', 'A2']);
  //   this.playerTiles[0][0] = '/src/assets/boattile.jpeg'; // Cambia la primera posición

  // });

  }
