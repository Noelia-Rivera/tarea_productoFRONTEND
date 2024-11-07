import { Routes } from '@angular/router';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';

export const routes: Routes = [
    {
        path: '',
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
