import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: any[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
    });
  }

  agregarCategoria(nombre: string) {
    this.categoriaService.agregarCategoria({ nombre }).subscribe(() => {
      this.obtenerCategorias();
    });
  }

  inactivarCategoria(categoriaId: string) {
    this.categoriaService.inactivarCategoria(categoriaId).subscribe(() => {
      this.obtenerCategorias();
    });
  }

  eliminarCategoria(categoriaId: string) {
    this.categoriaService.eliminarCategoria(categoriaId).subscribe(() => {
      this.obtenerCategorias();
    });
  }
}
