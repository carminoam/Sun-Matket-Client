import { CredentialsModel } from 'src/app/models/credentials.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/auth.service';
import store from 'src/app/redux/store';
import { RoleModel } from 'src/app/models/role-model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();

    constructor(private authService: AuthService, private notify: NotifyService, private router: Router) { }

    public async submit() {
        try {
            await this.authService.login(this.credentials);
            this.notify.success("You have been logged in");
            if (store.getState().authState.user.role === RoleModel.ADMIN){
                this.router.navigateByUrl("/admin");
            } else{
                this.router.navigateByUrl("/home");
            }
        }
        catch(err: any) {
            this.notify.error(err);
        }
    }
}
