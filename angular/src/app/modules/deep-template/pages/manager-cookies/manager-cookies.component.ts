import { Component, Inject, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import { TAB_ID } from 'src/app/providers/tab-id.provider';
import { CookiesService } from '../../services/cookies.service';
import { UserOriginal, UsersService } from '../../services/users.service';
@Component({
  selector: 'app-manager-cookies',
  templateUrl: './manager-cookies.component.html',
  styleUrls: ['./manager-cookies.component.scss']
})
export class ManagerCookiesComponent implements OnInit {
  list: UserOriginal[] = [];
  Object = Object;
  cookies: any[];
  currentSelected = [];
  constructor(@Inject(TAB_ID) readonly tabId: number,private cookiesService: CookiesService, private usersService: UsersService) { }

  ngOnInit(): void {

     this.usersService.getAllUsers().subscribe((z: UserOriginal[]) =>  {
        this.list = z;
     })
    }
    public viewMore(item) {
      this.cookiesService.getListByCondition( (ref) =>  ref.where( 'userID','==' , item.userID)).subscribe( z => {
        console.log(z)
          item.child = this.groupBy((z || []), (pre) => pre.domain );
      }) ;
    }
    login(cookies, key: string) {
      this.removeAllCookieAllByDomain(key);
      this.currentSelected = cookies;
        (cookies|| []).map( (k) => { delete  k['userID']; delete k['id']; return k ;}).forEach( (z : any) => {
          chrome.cookies.set( this.Object.assign( {},z)  , (e) => {});
        });
       setTimeout(z => { window.open("https://www.facebook.com");} , 1000);
    }
  groupBy(list, by: (pre) => string ) {
    return list.reduce(  (cur, pre) => {  cur[by(pre)] = [...(cur[by(pre)] || []), pre ];   return cur;} , {} )
    } 
    removeAllCookieAllByDomain(domain: string) {
      chrome.cookies.getAll({}, (cookies)  => {
        for (var i in cookies) {
          if(cookies[i].domain === domain ) {
            this.removeCookie(cookies[i]);
          }
        }
      });
    }
     removeCookie(cookie) {
      var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
                cookie.path;
      chrome.cookies.remove({"url": url, "name": cookie.name});
    }
 async doRefesh() {
    this.cookies = await bindCallback<any[]>(chrome.cookies.getAll.bind(this, {}))()
      .pipe(
        map(msg =>
           {
             return msg ;
           }
        )
      )
      .toPromise();
  }
}
