import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbTagComponent } from '@nebular/theme';

@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html',
  styleUrls: ['./input-details.component.scss']
})
export class InputDetailsComponent implements OnInit {

  form!: FormGroup;
  input: any;

  options: any = [];

  //Declarations
  entities = [
    "Session",
    "User"
  ];
  mime_types = [
    "audio/*",
    "video/*",
    "image/*",
    ".pdf",
    ".doc, .docx",
  ];
  data_types = [
    "text",
    "number",
    "url",
    "email",
  ];

  constructor(private builder: FormBuilder, protected dialogRef: NbDialogRef<InputDetailsComponent>) {
  }

  ngOnInit(): void {
    this.form = this.builder.group(this.input);
  }

  entityChoice(ev: any) {
    this.form.patchValue({
      entity: ev.target.value
    })
  }

  fileTypeChoice(ev: any) {
    this.form.patchValue({
      mime_type: ev.target.value
    })
  }

  listTypeChoice(ev: any) {
    this.form.patchValue({
      data_type: ev.target.value
    })
  }

  addOption(option: HTMLInputElement) {
    if (option.value.length > 0) {
      this.options.push(option.value)
      this.form.patchValue({
        options: this.options
      });
      option.value = ""
    }
  }

  onOptionRemove(optionToRemove: NbTagComponent) {
    this.options = this.options.filter((o: any) => o !== optionToRemove.text);
    this.form.patchValue({
      options: this.options
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else alert("Fill the Whole Form");
  }

}
