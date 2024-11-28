import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {  HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { EstudianteModel } from '../../models/EstudianteModel';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
interface dataRegisterFomr{
  Name : FormControl<string | null>
  LastName: FormControl<string  | null>
  DocumentNumber: FormControl<string  | null>
  Email:FormControl<string  | null>
  Password:FormControl<string  | null>
  ConfirmPassword:FormControl<string  | null>
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    HlmInputDirective,
    CommonModule,ReactiveFormsModule,
    HlmToasterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  private _formBuilder = inject(FormBuilder)
  private _EstudianteService = inject(EstudianteService)
 // private _router = inject(Router)
  RegisterForm = this._formBuilder.group<dataRegisterFomr>({
    Name: new FormControl(null,[Validators.required,Validators.minLength(2)]),
    LastName:new FormControl(null,[Validators.required,Validators.minLength(2)]),
    DocumentNumber: new FormControl (null,[Validators.required,Validators.minLength(8)]),
    Email: new FormControl (null,[Validators.required,Validators.email]),
    Password:new FormControl(null,[Validators.required]),
    ConfirmPassword:new FormControl(null,[Validators.required])
  })

  constructor(private _router: Router) {}
  OnSubmit(){
    const { Name,LastName,DocumentNumber,Email,Password,ConfirmPassword} = this.RegisterForm.value

    const inputData:EstudianteModel = {
      Nombre:Name!,
      Apellido:LastName!,
      Documento:DocumentNumber!.toString(),
      Correo:Email!,
      EstudiantePassword:Password!
    }
    debugger
    this._EstudianteService.crearEstudiante(inputData).subscribe((IdEstudiante:number)=>{
      if(IdEstudiante){
        this._EstudianteService.IdEstudiante.set(IdEstudiante)
        this.showToast('Estudiante Creado Exitosamente')
        setTimeout(() => {
          this._router.navigate(['/seleccionar-materias']);
        }, 2500);

      }
      else{
        this.showToast('Error al registrar estudiante')
      }
    })
  }
  showToast(mensaje: string) {
    let fecha = new Date().toLocaleDateString()
    toast(mensaje, {
      description: fecha,
    })
  }
}
