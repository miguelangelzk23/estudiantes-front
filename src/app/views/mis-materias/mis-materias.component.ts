import { Component } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
interface IMisMaterias{
  Id:number
  Nombre:string,
  Descripcion:string,
  NombreProfesor:string
  NombresEstudiantes:string[]
}
@Component({
  selector: 'app-mis-materias',
  standalone: true,
  imports: [HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    CommonModule,ReactiveFormsModule,
    HlmTableComponent, HlmTrowComponent, HlmThComponent, HlmTdComponent, HlmCaptionComponent,
    BrnSelectImports, HlmSelectImports],
  templateUrl: './mis-materias.component.html',
})
export class MisMateriasComponent {
materiaSeleccionada: IMisMaterias| null = null
 MisMaterias:IMisMaterias[] =[
  {Id:1,Nombre:'Español',Descripcion:'Materia Lectiva 3 creditos',NombreProfesor:'Miguel MOntaña',NombresEstudiantes:['Lorem Zaraza','Robinson Padilla','Segundo Montaña']},
  {Id:2,Nombre:'Matematicas',Descripcion:'Materia Lectiva 3 creditos',NombreProfesor:'Miguel MOntaña',NombresEstudiantes:['Lorem Zaraza','Robinson Padilla','Segundo Montaña']},
  {Id:3,Nombre:'Fisica',Descripcion:'Materia Lectiva 3 creditos',NombreProfesor:'Miguel MOntaña',NombresEstudiantes:['Lorem Zaraza','Robinson Padilla','Segundo Montaña']}
]
ListaMaterias = this.MisMaterias.map(x =>({
  Id:x.Id,
  Nombre:x.Nombre
}))
ChangeMateria(id:number){
  console.log(id)
  this.materiaSeleccionada = this.MisMaterias.find(materia => materia.Id == id)!
}
}
