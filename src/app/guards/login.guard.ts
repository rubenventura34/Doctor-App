import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private storage : StorageService,
    private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  checkLogin(): boolean {
    this.storage.get('sessionData').then(sessionData=>{
        if(sessionData){
          this.router.navigate(['/main/Inicio']);
          return false;
        } else {
          return true;
        }
      });
      return false;
  }

  
}
