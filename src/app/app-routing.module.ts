import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { UsuarioGuard } from './guards/usuario.guard'

const routes: Routes = [
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
    { path: 'main', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canLoad: [UsuarioGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'main/tabs/noticias' },
    { path: '**', pathMatch: 'full', redirectTo: 'main/tabs/noticias' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
