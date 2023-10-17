import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class AppService {
  sideNavBehaviourSubject:BehaviorSubject<boolean>=new BehaviorSubject(true)
  constructor() { }
}
