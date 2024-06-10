export class Library {
  id:string;
  name:string;
  address:string;
  openTime:string;
  closeTime:string;
  openDays:string;
  openStatement:string;
  open:boolean;


  constructor(id: string, name: string, address: string, openTime: string, closeTime: string, openDays: string, openStatement: string, open: boolean) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.openTime = openTime;
    this.closeTime = closeTime;
    this.openDays = openDays;
    this.openStatement = openStatement;
    this.open = open;
  }

  /*
    constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
      this.address = name;
      this.openTime = name;
      this.closeTime = name;
      this.openDays = name;
      this.openStatement = name;
      this.open = true;
    }*/
}
