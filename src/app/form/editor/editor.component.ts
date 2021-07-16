import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, copyArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { InputDetailsComponent } from './input-details/input-details.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private _jsonURL = 'assets/predefined_inputs.json';

  //Declarations Inputs
  form!: FormGroup;
  predefined_inputs: any = [];
  inputs: any = [];

  constructor(private http: HttpClient, private dialogService: NbDialogService, private builder: FormBuilder) {
    this.getJSON().subscribe(data => {
      this.predefined_inputs = data;
    });

    this.form = this.builder.group({
      template_name: "",
      inputs: []
    });
  }

  ngOnInit(): void {
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  //Drag/Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  //Inputs Details
  delete(index: number) {
    this.inputs.splice(index, 1);
  }

  open(input: any, index: number) {
    this.dialogService.open(InputDetailsComponent, {
      context: { input: input }
    })
      .onClose.subscribe(input => {
        this.inputs.splice(index, 1, input);
      });
  }

  onSubmit() {
    if (this.form.valid && this.inputs.length > 0) {
      let template = {
        template_name: this.form.value.template_name,
        components: this.inputs
      }
      console.log(template);
    } else alert("Fill the Whole Form");
  }

}
