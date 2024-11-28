import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { EstudianteModel } from '../models/EstudianteModel';
import { Imaterias } from '../views/select-materias/select-materias.component';
enum rutasapi{
  GetEstudiante = "consultar-estudiantes",
  CreateEstudiante = "crear-estudiante",
  GetMaterias = "consultar-materias",
  setMateriaEstudiante = "materias-estudiante"
}
@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private apiUrl = environment.apiUrl
  private _http = inject(HttpClient)
  IdEstudiante = signal<number | null>(null)
  constructor() { }

  ConsultarEstudiantes(){
    this._http.get(this.apiUrl+rutasapi.GetEstudiante);
  }

  crearEstudiante(estudiante:EstudianteModel){
   return  this._http.post<number>(this.apiUrl+rutasapi.CreateEstudiante,estudiante)
  }

  consultarMaterias(){
    return this._http.get<Imaterias[]>(this.apiUrl+rutasapi.GetMaterias)
  }

  AsignarMateriaEstudiante(MateriasEstudiante:any[]){
    return  this._http.post<boolean>(this.apiUrl+rutasapi.setMateriaEstudiante,MateriasEstudiante)
   }


}
