export class Users {
  public Id: string;
  public name: string;
  public pwd:string;
  public email:string;
  public pfp : any  ;

  constructor() {
    this.Id = '';
    this.name = '';
    this.pwd = '';
    this.email = '';
    this.pfp = '';
  }
}
