import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/assets/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  private JSON_FILE = '/assets/configs/goods-mock/index.json'
  

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.JSON_FILE);
  }  

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`/assets/configs/goods-mock/`+id+`.json`);
  }

  

}
