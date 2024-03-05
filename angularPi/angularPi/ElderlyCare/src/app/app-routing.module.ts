import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { AddProductComponent } from './add-product/add-product.component'; // Import AddProductComponent
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductlistclientComponent } from './productlistclient/productlistclient.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ElderlyCartComponent } from './elderly-cart/elderly-cart.component';
import { AdminarchivelistComponent } from './adminarchivelist/adminarchivelist.component';

const routes: Routes = [
  {
    path: '',
    component: AllTemplateFrontComponent,
    children: [
      {
        path: '',
        component: HomeFrontComponent
      },
      
      { path: 'product-details/:id', component: ProductdetailsComponent }, // Route for editing a specific product
      {
        path: 'products/:elderlyId',
        component: ProductlistclientComponent
      },
      {
        path: 'elderly/:elderlyId/cart',
        component: ElderlyCartComponent
      }

    ]
  },
  {
    path: 'admin',
    component: AllTemplateBackComponent,
    children: [
      {
        path: '',
        component: HomeBackComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'productlist',
        component: ProductlistComponent
      },
      { path: 'products/:id/edit', component: ProductEditComponent },
      { path: 'archive', component: AdminarchivelistComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
