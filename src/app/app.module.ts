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
import { CustomValidationDirective } from './directives/custom-validation.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { ReadObjectPipe } from './pipes/read-object.pipe';
import { InfinitScrollDirective } from './directives/infinit-scroll.directive';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { HighlightTextDirective } from './directives/highlight-text.directive';
import { AttributeDirective } from './directives/attribute.directive';

@NgModule({
  declarations: [
    AppComponent,
    ActionRendererComponent,
    TripleDotsRendererComponent,
    TagsRendererComponent,
    CustomValidationDirective,
    ClickOutsideDirective,
    FormComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    ReadObjectPipe,
    InfinitScrollDirective,
    BreadcrumbComponent,
    HighlightTextDirective,
    AttributeDirective,
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
