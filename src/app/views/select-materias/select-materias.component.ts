import { Component, inject, OnInit } from '@angular/core';
import {  HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { CommonModule } from '@angular/common';
export interface Imaterias{
  IdMateria:number,
  MateriaNombre:string,
  IdProfesor:number,
  Seleccionada:boolean
}
@Component({
  selector: 'app-select-materias',
  standalone: true,
  imports: [ CommonModule,HlmLabelDirective, HlmCheckboxComponent,  HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmButtonDirective],
  templateUrl: './select-materias.component.html',
  styleUrl: './select-materias.component.css'
})
export class SelectMateriasComponent  implements OnInit{
  private _router  = inject(Router)
  private _estudianteService = inject(EstudianteService)
  DisableChecks:boolean = false
  DisableButton:boolean = true
  name = new FormControl('');
  MostrarListadoMateiras:Imaterias[] = []
  ListaMateriasDummy :Imaterias[] = [
    {IdMateria:1,MateriaNombre:"Española",Seleccionada:false,IdProfesor:1},
    {IdMateria:2,MateriaNombre:"Matematicas",Seleccionada:false,IdProfesor:1},
    {IdMateria:3,MateriaNombre:"Musica",Seleccionada:false, IdProfesor:2},
    {IdMateria:4,MateriaNombre:"Ingles",Seleccionada:false,IdProfesor:2},
    {IdMateria:5,MateriaNombre:"Fisica",Seleccionada:false,IdProfesor:3},
    {IdMateria:6,MateriaNombre:"Quimica",Seleccionada:false,IdProfesor:3},
    {IdMateria:7,MateriaNombre:"Frances",Seleccionada:false,IdProfesor:4},
    {IdMateria:8,MateriaNombre:"Arquitectura",Seleccionada:false,IdProfesor:4},
    {IdMateria:9,MateriaNombre:"Dibujo",Seleccionada:false ,IdProfesor:5},
    {IdMateria:10,MateriaNombre:"Artes",Seleccionada:false,IdProfesor:5},

  ]
  MateriasSeleccionadas:number[] = []
  onCheckboxChange(id:number,e:boolean){
    let findIndex = this.MostrarListadoMateiras.findIndex(x => x.IdMateria == id)
    this.MostrarListadoMateiras[findIndex].Seleccionada = !this.MostrarListadoMateiras[findIndex].Seleccionada
    let contarMaterias = this.MostrarListadoMateiras.filter(materia => materia.Seleccionada == true )
    this.MateriasSeleccionadas = contarMaterias.map(x => x.IdMateria)
    if(contarMaterias.length >= 3){
      this.DisableChecks = true
      this.DisableButton = false
    }

  }

  ngOnInit(): void {
    this.consultarMaterias();
  }

  consultarMaterias(){
    this._estudianteService.consultarMaterias().subscribe({
      next: (res :Imaterias []) =>{
        this.MostrarListadoMateiras = res
      },
      error:() =>{
      this.MostrarListadoMateiras = this.ListaMateriasDummy
      }
    });

  }
  OnSubmit(){
    const materias:Imaterias[] = this.MostrarListadoMateiras.filter(materia => materia.Seleccionada == true )
    let listaDataEnviar :any[] = []
    materias.forEach(element => {
      let data = {
        MateriaId:element.IdMateria,
        ProfesorId:element.IdProfesor,
        EstudianteId:this._estudianteService.IdEstudiante()
      }
      listaDataEnviar.push(data)
    });
    this.guardarMateriasEstudiante(listaDataEnviar)
  }

  guardarMateriasEstudiante(inputData:any[]){
    this._estudianteService.AsignarMateriaEstudiante(inputData).subscribe((res:boolean)=>{
      this._router.navigateByUrl('/mis-materias')
    })
  }

}
