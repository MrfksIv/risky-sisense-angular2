import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdButtonModule, MdCheckboxModule, MdMenuModule, MdIconModule,
  MdTabsModule, MdInputModule, MdGridListModule, MdToolbarModule,
  MdChipsModule, MdSliderModule, MdCardModule, MdProgressSpinnerModule,
  MdSlideToggleModule, MdDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlatformComponent } from './platform/platform.component';
import { HeaderComponent } from './platform/header/header.component';
import { SliderFilterComponent } from './platform/slider-filter/slider-filter.component';
import { CheckboxFilterComponent } from './platform/checkbox-filter/checkbox-filter.component';
import { FilterGroupComponent } from './platform/filter-group/filter-group.component';
import { TableComponent } from './platform/table/table.component';
import { IndicatorComponent } from './platform/indicator/indicator.component';
import { CustomerInfoModalComponent } from './platform/table/customer-info-modal/customer-info-modal.component';

import { AuthService } from './authentication/auth.service';
import { QueryService } from './query/query.service';

import { AuthAccessGuard } from './authentication/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlatformComponent,
    HeaderComponent,
    SliderFilterComponent,
    CheckboxFilterComponent,
    FilterGroupComponent,
    TableComponent,
    IndicatorComponent,
    CustomerInfoModalComponent
  ],
  entryComponents:[
    CustomerInfoModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MdButtonModule, MdCheckboxModule, MdMenuModule, MdIconModule,
    MdTabsModule, MdInputModule, MdGridListModule, MdToolbarModule,
    MdChipsModule, MdSliderModule, MdCardModule, MdProgressSpinnerModule,
    MdSlideToggleModule, MdDialogModule

  ],
  providers: [AuthService, QueryService, AuthAccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
