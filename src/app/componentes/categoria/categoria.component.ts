import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [SidebarComponent, TableModule, CommonModule, CardModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias: Categoria[]=[];
  
  constructor(private categoriaService: CategoriaService){}

  ngOnInit():void {
    this.listarCategorias();
}

listarCategorias(){
  this.categoriaService.getCategoria().subscribe(
    (data: Categoria[]) => {
      this.categorias = data;
    });
}

}
