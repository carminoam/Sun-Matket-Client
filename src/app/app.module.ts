import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoginComponent } from './components/auth-area/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AdminPageComponent } from './components/admin-area/admin-page/admin-page.component';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { UpdateProductComponent } from './components/admin-area/update-product/update-product.component';
import { CartComponent } from './components/products-area/cart/cart.component';
import { JwtInterceptor } from './services/jwt.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { OrderComponent } from './components/products-area/order/order.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogComponent } from './components/products-area/dialog/dialog.component';
import { ProductsTableComponent } from './components/admin-area/products-table/products-table.component';
import { HighlightPipe } from './pipes/highlight.pipe';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductCardComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AdminPageComponent,
    AddProductComponent,
    UpdateProductComponent,
    CartComponent,
    OrderComponent,
    DialogComponent,
    ProductsTableComponent,
    HighlightPipe
  ],
  entryComponents: [DialogComponent],
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
    MatSelectModule,
    LayoutModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatSortModule

  ],
  providers: [{
    useClass: JwtInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
