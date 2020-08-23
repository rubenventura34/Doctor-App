import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private storage: StorageService,
    private router: Router
  ) { }

  login(postData: any): Observable<any>{
    return this.httpService.post('authMedico', postData);
  }
  logout(){
    this.storage.clear().then(res=>{
      this.router.navigate(['/ingresar']);
    });
  }
  isLogin(){
    return new Promise((resolve) => {
      this.storage.get('sessionData').then(sessionData=>{
        if(sessionData){
          resolve(true);
        } else {
          this.router.navigate(['/ingresar']);
          resolve(false);
        }
      });
    });
  }
  getToken(){
      return this.storage.get('sessionData').then(sessionData=>{
        if(sessionData){
          return sessionData.userData.api_token;
        } else {
          return '';
        }
      });
  }
}