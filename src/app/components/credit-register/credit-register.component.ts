import { Component, OnInit } from '@angular/core';
import { CreditRequestService } from '../../services/credit-request.service';
import { Client } from '../../models/client';
import { Credit } from '../../models/credit';

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
  admissionDate: Date;
  clients: Array<Client>;
  client: Client;
  credit: Credit;
  idClient: string;
  valueCredit:string;

  typeDocumentModel: number;
  numDocumentModel: number;
  dayModel: number;
  monthModel: number;
  yearModel: number;
  nameModel: string;
  nitModel: number;
  salaryModel: number;

  constructor(private creditRequestService: CreditRequestService) { }

  ngOnInit() {
    this.getTypeDocs();
    this.getArrayDays();
    this.getMounth();
    this.getYear();
  }

  saved() {
    this.alertSucces = 0;

    if (this.validateSaved() == true) {

      this.creditRequestService.getClient(this.typeDocumentModel, this.numDocumentModel)
        .subscribe((res) => { this.client = res['data'][0]; });

      this.admissionDate = new Date(this.yearModel, this.monthModel, this.dayModel);

      this.idClient = this.client._id;

      this.valueCredit = this.getValueCredit(this.salaryModel);

      this.credit = {
        clientId: this.idClient,
        nameCompany: this.nameModel,
        nitCompany: this.nitModel,
        currentSalary: this.salaryModel,
        admissionDate: this.admissionDate,
        registerDate: new Date(),
        state: 'Activo'
      }

      this.creditRequestService.addCredit(this.credit)
        .subscribe((res) => { this.alertMessage = res['data']; });

      this.alertSucces = 1;
    }
  }

  getValueCredit(salary: number): string {
    if (salary > 800000 && salary < 1000000) 
    return '$5000000'

    if (salary > 1000000&& salary < 4000000) 
    return '$20000000'

    if (salary > 4000000 && salary < 4000000) 
    return '$50000000'
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
        this.alertMessage = 'No se puede aprobar un crédito si lleva menos de un año y medio de trabjo en la empresa.';
        return false
      }

      this.creditRequestService.getClient(this.typeDocumentModel, this.numDocumentModel)
        .subscribe((res) => { this.clients = res['data']; });

      if (this.clients && this.clients.length <= 0) {
        this.alertModel = 1;
        this.alertMessage = `El cliente con el número de doumento ${this.numDocumentModel} no se encuentra registrado.`;
        return false
      }
      if (this.salaryModel < 800000) {
        this.alertModel = 1;
        this.alertMessage = `Pasa solicitar un crédito su salario debe ser mayor a $800000.`;
        return false

      }
    }
    return true;
  }

  validateDate(year: number, mounth: number, day: number): Boolean {
    var today = new Date();
    this.admissionDate = new Date(this.yearModel, this.monthModel, this.dayModel);

    var diasDif = today.getTime() - this.admissionDate.getTime();
    var dias = Math.round(diasDif / (1000 * 60 * 60 * 24));
    if (dias < 547) {
      return false
    }
    return true;
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
