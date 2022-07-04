import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  public products: ProductModel[];
  public sortedData: ProductModel[];
  public counter: number = 0;

  constructor(
    private productsService: ProductsService,
    private notifyService: NotifyService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.products = await this.productsService.getAllProducts();
      this.sortedData = this.products?.slice();
    } catch (err) {
      this.notifyService.error(err);
    }
  }

  public sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'category':
          return compare(a.category, b.category, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
