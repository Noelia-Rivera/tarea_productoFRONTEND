import { Routes } from '@angular/router';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
<<<<<<< HEAD
=======
import { HomeComponent } from './home/home.component';
>>>>>>> dc4285e (commit)

export const routes: Routes = [
    {
        path: '',
<<<<<<< HEAD
=======
        component: HomeComponent,
        title: 'home'
    },
    {
        path: 'producto',
>>>>>>> dc4285e (commit)
        component: ProductoComponent,
        title: 'Producto'
    },
    {
        path: 'categoria',
        component: CategoriaComponent,
        title: 'Categoria'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
