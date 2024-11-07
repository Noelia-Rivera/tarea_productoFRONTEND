import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductoService } from '../../service/producto.service';
import { CategoriaService } from '../../service/categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [SidebarComponent,TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
  providers: [ProductoService, CategoriaService, ConfirmationService, MessageService]
})
export class ProductoComponent {
  productos: Producto[]=[];
  categorias: Categoria[]=[];
  producto: Producto= new Producto(0, '', 0, new Categoria(0, ''));

  titulo: string= '';
  opc: string= '';
  op= 0;
  visible: boolean= false;
  isDeleteInProgress: boolean= false;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit():void {
    this.listarProducto();
    this.listarCategoria();
  }

  listarProducto(){
    this.productoService.getProducto().subscribe((data: Producto[]) => {
      this.productos = data;
    })
  }

  listarCategoria(){
    this.categoriaService.getCategoria().subscribe((data: Categoria[]) => {
      this.categorias = data;
    })
  }

  addProducto():void{
    this.productoService.createProducto(this.producto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Escuela registrada con exito',
        });
        this.listarProducto();
        this.op= 0;
      },
      error: () => {
        this.isDeleteInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se puedo registrar la Escuela",
        });
      },
    });
    this.visible= false;
  }

  editEscuelas(){
    this.producto.id_categoria = this.categorias.find(f => f.id === this.producto.id_categoria?.id)!;
    this.productoService.editaProducto(this.producto, this.producto.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Escuela editada con exito',
        });
        this.listarProducto();
        console.log(this.producto.id + ' ' + this.producto.nombre + ' ' + this.producto.id_categoria);
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la escuela',
        });
      },
    });
    this.visible= false;
  }

  deleteEscuela(id: number){
    this.isDeleteInProgress= true;
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Escuela eliminada con exito',
        });
        this.isDeleteInProgress= false;
        this.listarProducto();
      },
      error: () => {
        this.isDeleteInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la escuela',
        });
      },
    });  
  }

  showDialogCreate(){
    this.titulo= "Añadir nueva Escuela"
    this.opc= "Guardar";
    this.op= 0;
    this.visible= true;
  }

  showDialogEdit(id: number){
    this.titulo= "Editar Escuela"
    this.opc= "Actualizar";
    this.productoService.getProductoById(id).subscribe((data)=>{
      this.producto= data;
      this.op= 1;
    });
    this.visible= true;
  }

  showDiaologDelete(event: Event, id: number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres eliminar esta escuela?',
      header: 'Confirmacion de Eliminacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.deleteEscuela(id);
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Operacion cancelada' });
      }
    });
  }

  limpiar(){
    this.titulo= '';
    this.opc= '';
    this.op= 0;
    this.producto.id= 0;
    this.producto.nombre= '';
    this.producto.cantidad= 0;
    this.producto.id_categoria= new Categoria(0, '');
  }

  opcion(): void{
    if (this.op==0) {
      this.addProducto();
      this.limpiar();
    } else if (this.op==1) {
      console.log("Editar");
      this.editEscuelas();
      this.limpiar();
    } else {
      console.log("Vacio");
      this.limpiar();
    }
  }    
}