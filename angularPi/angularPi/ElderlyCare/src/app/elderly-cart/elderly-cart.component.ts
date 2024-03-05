import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-elderly-cart',
  templateUrl: './elderly-cart.component.html',
  styleUrls: ['./elderly-cart.component.css']
})
export class ElderlyCartComponent implements OnInit {
  elderlyId!: number;
  elderlyCart: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.elderlyId = +params['elderlyId'];
      console.log('Elderly ID from URL:', this.elderlyId);
      this.getElderlyCart();
    });
  }

  getElderlyCart(): void {
    console.log('Fetching elderly cart...');
    this.productService.getElderlyCart(this.elderlyId)
      .subscribe(cart => {
        console.log('Elderly cart:', cart);
        this.elderlyCart = cart;
      }, error => {
        console.error('Error fetching elderly cart:', error);
      });
  }

 

  updateTotalPrice(index: number): void {
    const item = this.elderlyCart[index];
    item.totalPrice = item.price * item.quantite;
  }


  

  removeItem(index: number): void {
    this.elderlyCart.splice(index, 1);
  }
  
  highlightRow(event: MouseEvent): void {
    (event.target as HTMLElement).parentElement?.classList.add('highlighted-row');
  }

  removeHighlight(event: MouseEvent): void {
    (event.target as HTMLElement).parentElement?.classList.remove('highlighted-row');
  }
  cancelOrder(orderId: number): void {
    const index = this.elderlyCart.findIndex(item => item.orderId === orderId);
    if (index !== -1) {
      this.elderlyCart.splice(index, 1);
    }
  
    this.productService.cancelOrder(orderId)
      .subscribe(
        () => {
          // Order cancelled successfully
        }
      );
  }
  
  
updateQuantity(orderId: number, newQuantity: number): void {
  console.log('Updating quantity for order ID:', orderId);
  console.log('New quantity:', newQuantity);

  const payload = { orderId: orderId, quantity: newQuantity };
  console.log('Request payload:', payload);

  this.productService.updateCartItemQuantity(orderId, newQuantity).subscribe(
    response => {
      console.log('Quantity updated successfully:', response);
      // Handle success, if needed
    },
    error => {
      if (error.status === 200 && !error.ok) {
        // Consider status 200 with ok being false as an error
        // Handle error accordingly
      } else {
        // Handle other errors
      }
    }
  );
}

decrementQuantity(orderId: number, currentQuantity: number): void {
  console.log('Decrementing quantity for order ID:', orderId);
  const newQuantity = Math.max(1, currentQuantity - 1); // Ensure quantity doesn't go below 1
  console.log('New quantity:', newQuantity);

  // Update the quantity directly in the local elderlyCart array
  const index = this.elderlyCart.findIndex(item => item.orderId === orderId);
  if (index !== -1) {
    this.elderlyCart[index].quantite = newQuantity;
    this.updateTotalPrice(index);

  }

  // Call the updateQuantity method to update the quantity in the backend
  this.updateQuantity(orderId, newQuantity);
}

incrementQuantity(orderId: number, currentQuantity: number): void {
  console.log('Incrementing quantity for order ID:', orderId);
  const newQuantity = currentQuantity + 1;
  console.log('New quantity:', newQuantity);

  // Update the quantity directly in the local elderlyCart array
  const index = this.elderlyCart.findIndex(item => item.orderId === orderId);
  if (index !== -1) {
    this.elderlyCart[index].quantite = newQuantity;
    this.updateTotalPrice(index);

  }

  // Call the updateQuantity method to update the quantity in the backend
  this.updateQuantity(orderId, newQuantity);
}
 buyOrder(orderId: number): void {
    // Show confirmation dialog
    const confirmed = confirm("Are you sure you want to buy this order?");
    if (confirmed) {
        this.productService.buyOrder(orderId)
            .subscribe(
                () => {
                    // Order bought successfully
                    // Assuming you may want to update the UI or take other actions
                },
                (error) => {
                    console.error('Error buying order:', error);
                    // Handle error
                }
            );window.location.reload()
    } else {
        console.log('Action cancelled');
    }
}

}