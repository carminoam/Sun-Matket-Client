import { Router } from '@angular/router';
import { UserModel } from './../../../models/user.model';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public step1Passed: boolean = false;

    private checkStep1() {
        this.step1Passed = !this.step1Passed;
    }

    public user = new UserModel();

    public passwordConfirm = '';

    constructor(
        private authService: AuthService, 
        private notify: NotifyService, 
        private router: Router) { }

    public async submit1(): Promise<void> {
        try {
            const newUser = await this.authService.register1(this.user);
            this.user = newUser;
            this.checkStep1();
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

    public async submit2(): Promise<void> {
        try {
            await this.authService.register2(this.user);
            delete this.user.password;
            this.router.navigateByUrl("/home");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

}
