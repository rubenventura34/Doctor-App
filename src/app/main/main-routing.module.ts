import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
    	{
    	path: 'paciente/:token',
    	loadChildren: () => import('../paciente/paciente.module').then( m => m.PacientePageModule),
        canActivate: [AuthGuard]
	  },
	  {
	    path: 'Inicio',
	    loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule),
        canActivate: [AuthGuard]
	  },
	  {
	    path: 'reporte/:token',
	    loadChildren: () => import('../reporte/reporte.module').then( m => m.ReportePageModule),
      canActivate: [AuthGuard]
	  },
    ]
  },
  {
      path: '',
      redirectTo: '/main/Inicio',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
