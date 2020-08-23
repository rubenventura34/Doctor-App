import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private storage : StorageService,
    private router: Router){};
  
  canActivate() : any{
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
  
}