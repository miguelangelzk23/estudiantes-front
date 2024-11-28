import { Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { SelectMateriasComponent } from './views/select-materias/select-materias.component';
import { Component } from '@angular/core';
import { MisMateriasComponent } from './views/mis-materias/mis-materias.component';

export const routes: Routes = [
  {path:'',redirectTo: '/registro', pathMatch:'full'},
  {path:'registro',component:RegisterComponent},
  {path:'seleccionar-materias',component:SelectMateriasComponent},
  {path:'mis-materias',component:MisMateriasComponent },
  {path:'**', redirectTo:'/registro'},
]
