import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbInputModule, NbButtonModule, NbListModule, NbCardModule, NbDialogModule, NbSelectModule, NbToggleModule, NbCheckboxModule, NbTagModule, NbRadioModule, NbDatepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EditorComponent } from './form/editor/editor.component';
import { FormComponent } from './form/form/form.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputDetailsComponent } from './form/editor/input-details/input-details.component';
import { RefComponent } from './form/form/ref/ref.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    FormComponent,
    InputDetailsComponent,
    RefComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    //Nebular
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NbListModule,
    NbCardModule,
    NbDialogModule.forRoot(),
    //Nebular - Components
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbRadioModule,
    NbCheckboxModule,
    NbToggleModule,
    NbTagModule,
    NbDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
