import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableComponent,
    FeatherModule.pick(allIcons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
