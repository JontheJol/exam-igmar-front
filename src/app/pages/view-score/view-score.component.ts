import { Component } from '@angular/core';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-view-score',
  standalone: true,
  imports: [],
  templateUrl: './view-score.component.html',
  styleUrl: './view-score.component.css'
})
export class ViewScoreComponent {

  resultados: any[] = [];
  gain:string = "Ganado";
  who:string = "Quien";

  ganados: number = 0;
  perdidos: number = 0;

  constructor(private dataService: TokenService) { }

  ngOnInit() {
    this.dataService.sendRequestWithToken("api/score",{}).subscribe((data: any) => {
      for (const resultado of data) {
        this.resultados.push({
          resultado: resultado.resultado,
          contra: resultado.contra
        });
        console.log(resultado);

      }
      this.gain = data.resultado;
      this.who = data.contra;
      this.calcularResultados();
    });
  }

  calcularResultados() {
    this.ganados = 0;
    this.perdidos = 0;

    for (const resultado of this.resultados) {
      if (resultado.resultado === 'Ganado') {
        this.ganados++;
      } else {
        this.perdidos++;
      }
    }
  }

}
