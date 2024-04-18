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


  // SPRITES REFERENCES
  waterTiles: string[] = [
    'assets/images/boat.jpeg',
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
    this.initializeButtonStates();

  }

  initializeOponentBoard() {
    this.drawOponentBoard();
    this.getOponnentBoatsPositions();
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
  getLetterFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }
   // Método para determinar si un botón debería estar deshabilitado
   initializeButtonStates() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.buttonStates[i] = Array(this.tiles[i].length).fill(true);
    }
  }

  // Método para manejar el clic en el botón
  handleClick(rowIndex: number, colIndex: number) {
    // Deshabilitar el botón una vez que se hace clic en él
    this.buttonStates[rowIndex][colIndex] = false;
  }
  }
