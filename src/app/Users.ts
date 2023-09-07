export class Users {
  public id : string;
  public name: string;
  public pwd:string;
  public email:string;
  public pfp :File | null = null ;

  constructor() {
    this.id = '';
    this.name = '';
    this.pwd = '';
    this.email = '';
    this.pfp = null;
  }
}
