import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
//import { SidebarFrontComponent } from './FrontOffice/sidebar-front/sidebar-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductlistclientComponent } from './productlistclient/productlistclient.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ElderlyCartComponent } from './elderly-cart/elderly-cart.component';
import { AdminarchivelistComponent } from './adminarchivelist/adminarchivelist.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
  //  SidebarFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeFrontComponent,
    HomeBackComponent,
    AddProductComponent,
    ProductlistComponent,
    ProductEditComponent,
    ProductlistclientComponent,
    ProductdetailsComponent,
    ElderlyCartComponent,
    AdminarchivelistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
