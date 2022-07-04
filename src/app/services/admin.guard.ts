import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleModel } from '../models/role-model';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public constructor(private notify: NotifyService, private router: Router) { }
  
  canActivate(): boolean {
    if (store.getState().authState.user.role === RoleModel.ADMIN) {
      return true;
    }

    this.notify.error("You are not Admin");
    this.router.navigateByUrl("/login");
    return false;

  }

}


