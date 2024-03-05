import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../Models/product.module';

@Component({
  selector: 'app-productlistclient',
  templateUrl: './productlistclient.component.html',
  styleUrls: ['./productlistclient.component.css']
})

export class ProductlistclientComponent implements OnInit {
  products: Product[] = [];
  imageUrlPrefix = 'http://localhost:80/hazemimage/';
  elderlyId: number | undefined;
  searchTerm: string = '';
  filteredProducts: Product[] = []; // Declare filteredProducts property

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.fetchProducts();
    this.route.paramMap.subscribe(params => {
      this.elderlyId = Number(params.get('elderlyId'));
    });
  }

  fetchProducts(): void {
    this.productService.getAllProducts()
      .subscribe(
        (products: Product[]) => {
          // Filter products where archProd is available
          this.products = products.filter(product => product.archProd === 'Available')
            .map(product => {
              product.imageUrl = `${this.imageUrlPrefix}${product.imageUrl}`;
              return product;
            });
  
          // Initialize filteredProducts with all products initially
          this.filteredProducts = [...this.products];
        },
        (error) => {
          console.error('Error fetching products: ', error);
        }
      );
  }
  

  buyProduct(productId: number): void {
    if (this.elderlyId !== undefined) {
      this.productService.addProductToOrder(productId, this.elderlyId)
        .subscribe(
          () => {
            console.log('Product added to order successfully');
          },
          (error) => {
            console.error('Error adding product to order: ', error);
          }
        );
    } else {
      console.error('Elderly ID is undefined');
    }
  }

  goToCart(): void {
    if (this.elderlyId !== undefined) {
      this.router.navigate(['elderly', this.elderlyId, 'cart']);
    } else {
      console.error('Elderly ID is undefined');
    }
  }

  // Method to handle dynamic filtering as the user types in the search input
 
  // Method to handle dynamic filtering as the user types in the search input
  searchProducts(): void {
    if (this.searchTerm.trim() === '') {
      // If search term is empty, fetch all available products
      this.fetchAvailableProducts();
    } else {
      // Search available products based on the search term
      this.productService.searchProducts(this.searchTerm)
        .subscribe(
          (products: Product[]) => {
            // Filter and map the available products
            this.products = products.filter(product => product.archProd === 'Available')
                                   .map(product => {
                                      product.imageUrl = `${this.imageUrlPrefix}${product.imageUrl}`;
                                      return product;
                                   });
          },
          (error) => {
            console.error('Error searching products: ', error);
          }
        );
    }
  }
  fetchAvailableProducts(): void {
    this.productService.getAllProducts()
      .subscribe(
        (products: Product[]) => {
          // Filter and map the available products
          this.products = products.filter(product => product.archProd === 'Available')
                                 .map(product => {
                                    product.imageUrl = `${this.imageUrlPrefix}${product.imageUrl}`;
                                    return product;
                                 });
        },
        (error) => {
          console.error('Error fetching products: ', error);
        }
      );
  }
  
}
