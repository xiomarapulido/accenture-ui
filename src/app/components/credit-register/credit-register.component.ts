import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-register',
  templateUrl: './credit-register.component.html'
})
export class CreditRegisterComponent implements OnInit {

  typeDocument = [];
  day = [];
  month = [];
  year = [];
  alertModel: number = 0;
  alertSucces: number = 0;
  alertMessage: string = '';

  typeDocumentModel: number;
  numDocumentModel: number;
  dayModel: number;
  monthModel: number;
  yearModel: number;
  nameModel: string;
  nitModel: number;
  salaryModel: number;

  constructor() { }

  ngOnInit() {
    this.getTypeDocs();
    this.getArrayDays();
    this.getMounth();
    this.getYear();
  }

  saved() {
    this.alertSucces = 0;
    this.validateSaved()
  }

  validateSaved() {
    this.alertModel = 0;
    this.alertMessage = '';
    if (this.validateModel() == false) {
      this.alertModel = 1;
      this.alertMessage = 'Todos los campos son obligatorios.';
      return false;
    }
    else {
      if (!this.validateDate(this.yearModel, this.monthModel, this.dayModel)) {
        this.alertModel = 1;
        this.alertMessage = 'No se puede aprobar un crédito si lleva menos de un año de trabjo en la empresa.';
        return false
      }

    }
    // else {
    //   if (!this.validateAge(this.yearModel, this.monthModel, this.dayModel)) {
    //     this.alertModel = 1;
    //     this.alertMessage = 'No se pueden registrar clientes menores de edad.';
    //     return false
    //   }

    // this.creditRequestService.getClient(this.typeDocumentModel, this.numDocumentModel)
    //   .subscribe((res) => { this.clients = res['data']; });

    // if (this.clients && this.clients.length > 0) {
    //   this.alertModel = 1;
    //   this.alertMessage = `Existe un cliente registrado con el número de documento ${this.numDocumentModel}`;
    //   return false
    // }

    // }
    return true;
  }

  validateDate(year: number, mounth: number, day: number): Boolean {
    var today = new Date();
      
    return false;
  }

  validateModel(): Boolean {
    if (!this.typeDocumentModel) {
      document.getElementById("tipoDoc").focus();
      return false;
    }
    if (!this.numDocumentModel) {
      document.getElementById("numDoc").focus();
      return false;
    }
    if (!this.dayModel) {
      document.getElementById("day").focus();
      return false;
    }
    if (!this.monthModel) {
      document.getElementById("month").focus();
      return false;
    }
    if (!this.yearModel) {
      document.getElementById("year").focus();
      return false;
    }
    if (!this.nameModel) {
      document.getElementById("name").focus();
      return false;
    }
    if (!this.nitModel) {
      document.getElementById("nit").focus();
      return false;
    }
    if (!(this.salaryModel) || this.salaryModel <= 0) {
      document.getElementById("salary").focus();
      return false;
    }
    return true;
  }

  getTypeDocs() {
    this.typeDocument.push({ id: 1, name: 'Cédula de ciudadanía' });
    this.typeDocument.push({ id: 2, name: 'Cédula de extranjería' });
  }

  getArrayDays() {
    for (var i = 1; i < 31; i++) {
      this.day.push({ value: i });
    }
  }

  getMounth() {
    this.month.push({ id: 0, name: 'Ene' });
    this.month.push({ id: 1, name: 'Feb' });
    this.month.push({ id: 2, name: 'Mar' });
    this.month.push({ id: 3, name: 'Abr' });
    this.month.push({ id: 4, name: 'May' });
    this.month.push({ id: 5, name: 'Jun' });
    this.month.push({ id: 6, name: 'Jul' });
    this.month.push({ id: 7, name: 'Ago' });
    this.month.push({ id: 8, name: 'Sep' });
    this.month.push({ id: 9, name: 'Oct' });
    this.month.push({ id: 10, name: 'Nov' });
    this.month.push({ id: 11, name: 'Dic' });
  }

  getYear() {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    for (var i = 1929; i < anio + 1; i++) {
      this.year.push({ value: i });
    }
  }


}
