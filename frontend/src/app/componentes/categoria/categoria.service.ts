import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/api/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregar`, categoria);
  }

  inactivarCategoria(categoriaId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inactivar`, { categoriaId });
  }

  eliminarCategoria(categoriaId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar`, { body: { categoriaId } });
  }
}
