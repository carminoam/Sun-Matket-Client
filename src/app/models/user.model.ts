import { RoleModel } from "./role-model";

export class userAddress {
    city: string;
    street: string;
    number: number;
}

export class UserModel {
    public _id: string;
    public firstName: string;
    public lastName: string;
    public idNumber: string;
    public email: string;
    public city: string;
    public street: string;
    public role: string = RoleModel.USER;
    public password: string;
}
