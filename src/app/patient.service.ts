import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Patient } from "./interfaces";

export enum Genders { male, female}

const patients = [{
  id: 0,
  name: 'Антон',
  lastName: 'Лаврик',
  secondName: 'Евгеньевич',
  age: 26,
  sex: Genders.male,
  date: new Date(1629211809934),
  issues: ['Болит голова']
},{
  id: 1,
  name: 'Елена',
  lastName: 'Шульц',
  secondName: 'Владимировна',
  age: 34,
  sex: Genders.female,
  date: new Date(1629211809934),
  issues: ['Болит голова']
},{
  id: 2,
  name: 'Иван',
  lastName: 'Громов',
  secondName: 'Олегович',
  age: 42,
  sex: Genders.male,
  date: new Date(1629211809934),
  issues: ['Тошнота', 'кружится голова по утрам']
},
]

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor() { }

  getPatients(): Observable<Patient[]> {
    return of(patients)
  }

  setPatient(id: string, p: Patient): void {
    patients[+id] = p;
  }

}
