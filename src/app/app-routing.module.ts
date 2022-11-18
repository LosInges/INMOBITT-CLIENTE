import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'inmobiliaria',
    loadChildren: () => import('./inmobiliaria/inmobiliaria.module').then( m => m.InmobiliariaPageModule)
  },
  {
    path: 'fletes',
    loadChildren: () => import('./fletes/fletes.module').then( m => m.FletesPageModule)
  },   {
    path: 'perfil',
    loadChildren: () => import('./inmobiliaria/perfil/perfil.module').then( m => m.PerfilPageModule)
  }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
