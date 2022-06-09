import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AdminPageComponent } from './components/admin-area/admin-page/admin-page.component';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { UpdateProductComponent } from './components/admin-area/update-product/update-product.component';
import { CartComponent } from './components/products-area/cart/cart.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';





@NgModule({
  declarations: [
    ProductsListComponent,
    ProductCardComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    AuthMenuComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AdminPageComponent,
    AddProductComponent,
    UpdateProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
