import { Unsubscribe } from 'redux';
import { shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { RoleModel } from 'src/app/models/role-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private breakpointObserver: BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public user: UserModel;
  public isAdmin: boolean = false;
  private unsubscribe: Unsubscribe;

  ngOnInit(): void {
    this.user = store.getState().authState.user;
    // this.isAdmin = this.user.role === RoleModel.ADMIN ? true : false;
    // if(this.user.role === null || this.user.role === RoleModel.USER) {  
    //   this.isAdmin = false;
    // } else if (this.user.role === RoleModel.ADMIN) {
    //   this.isAdmin = true;
    // }
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  handleCart() {
    console.log('cart');
  }

}
