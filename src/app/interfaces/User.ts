// @ts-ignore
import { UserI } from './User';

export interface UserI {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  usrPass: string;
  isDelete: number;
}

export class User implements UserI {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  usrPass: string;
  isDelete: number;

  constructor();
  constructor(obj: any);

  constructor(obj?: any) {
    this.id = obj?.id ? obj.id : 0;
    this.fullName = obj?.fullName ? obj.fullName : '';
    this.email = obj?.email ? obj.email : '';
    this.userName = obj?.userName ? obj.userName : '';
    this.usrPass = obj?.usrPass ? obj.usrPass : '';
    this.isDelete = obj?.isDelete ? obj.isDelete : 1;
  }
}
