import { Observable } from 'rxjs';
import { HorarioDTO } from 'src/app/model/horario.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  adquirirTodos(): Observable<Array<HorarioDTO>> {
    return this.httpClient.get<Array<HorarioDTO>>(
      this.baseUrl + 'horario/adquirir'
    );
  }

  salvar(horario: HorarioDTO): Observable<HorarioDTO> {
    return this.httpClient.post<HorarioDTO>(
      this.baseUrl + 'horario/salvar',
      horario
    );
  }

  deletar(horario: HorarioDTO): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + 'horario/deletar', {
      body: horario,
    });
  }
}
