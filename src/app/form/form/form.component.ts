import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  inputs = [
    {
      "name": "TEXT",
      "label": "First Name",
      "id": "first_name",
      "hint": "First Name",
      "required": true,
      "min_length": 1,
      "max_length": 10
    },
    {
      "name": "TEXT",
      "label": "Last Name",
      "id": "last_name",
      "hint": "Last Name",
      "required": true,
      "min_length": 1,
      "max_length": 10
    },
    {
      "name": "NUMBER",
      "label": "Age",
      "id": "age",
      "hint": "0",
      "required": false,
      "min": 1,
      "max": 10,
      "operation": "test",
      "auto_calculated": true
    },
    {
      "name": "FILE",
      "label": "Profile Picture",
      "id": "profile_picture",
      "required": false,
      "mime_type": ".pdf"
    },
    {
      "name": "DROPDOWN",
      "label": "Gender",
      "id": "gender",
      "required": false,
      "options": ["Female", "Male"],
      "multiple": true
    },
  ]

  constructor(private builder: FormBuilder) {
    let f: any = {};
    this.inputs.forEach(input => {
      f[input.label.toLowerCase().split(" ").join("_")] = ""
    });
    this.form = this.builder.group(f);
  }

  ngOnInit(): void {
  }

  autoCalculate(operation : string){
    console.log(operation);
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.getRawValue()));
  }

}
