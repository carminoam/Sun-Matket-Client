import { CredentialsModel } from 'src/app/models/credentials.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/auth.service';

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
            this.router.navigateByUrl("/home");
        }
        catch(err: any) {
            this.notify.error(err);
        }
    }
}
