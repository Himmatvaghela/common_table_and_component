import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { concatMap, from, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(public commonService: CommonService, private http: HttpClient) {}
  title = 'custom-agGrid-table';

  outsideClicked(e: any) {
    this.commonService.sidebarToggle = false;
  }

  userId = from([10, 20, 30]);

  ngOnInit(): void {
    this.http
      .get('https://mockly.me/users?count=5')
      .pipe(
        concatMap((val: any) => from(val)),
        concatMap((users: any) => {
          console.log(users);
          return this.http.get(
            `https://api.dicebear.com/7.x/initials/svg?seed=${users.name}`,
            { responseType: 'text' }
          );
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    // this.userId
    //   .pipe(
    //     concatMap((val) => {
    //       console.log(val);
    //       return of(1);
    //     })
    //   )
    //   .subscribe(() => {});
  }
}
