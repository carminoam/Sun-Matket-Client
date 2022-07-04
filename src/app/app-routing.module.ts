import { AdminGuard } from './services/admin.guard';
import { OrderComponent } from './components/products-area/order/order.component';
import { UpdateProductComponent } from './components/admin-area/update-product/update-product.component';
import { AdminPageComponent } from './components/admin-area/admin-page/admin-page.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }, 
  { path: "admin", component: AdminPageComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: "order", component: OrderComponent },
  { path: "admin/add", component: AddProductComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: "admin/update", component: UpdateProductComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: "products", component: ProductsListComponent, canActivate: [AuthGuard] },
  { path: "about", component: AboutComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },


  // Page not found:
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
