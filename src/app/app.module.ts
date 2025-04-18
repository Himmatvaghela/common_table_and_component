import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ActionRendererComponent } from './common/data-table/renderers/action-renderer/action-renderer.component';
import { TripleDotsRendererComponent } from './common/data-table/renderers/triple-dots-renderer/triple-dots-renderer.component';
import { TagsRendererComponent } from './common/data-table/renderers/tags-renderer/tags-renderer.component';
import { MultiSelectComponent } from './common/multi-select/multi-select.component';
import { FormsModule } from '@angular/forms';
import { SingleSelectComponent } from './common/single-select/single-select.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionRendererComponent,
    TripleDotsRendererComponent,
    TagsRendererComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableComponent,
    FeatherModule.pick(allIcons),
    MultiSelectComponent,
    SingleSelectComponent,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
