import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  urlRegEx = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  form!: FormGroup;
  inputs: any = [];
  submited: boolean = false;

  constructor(private http: HttpClient, private builder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getJSON().subscribe(data => {
      this.inputs = data;
      let f: any = {};
      this.inputs.forEach((input: any) => {
        switch (input.name) {
          case "TEXT":
            f[input.id] = new FormControl("", [
              input.required ? Validators.required : this.NoValidation,
              Validators.minLength(input.min_length),
              Validators.maxLength(input.max_length)
            ]);
            break;
          case "NUMBER":
            f[input.id] = new FormControl("", [
              input.required ? Validators.required : this.NoValidation,
              Validators.min(input.min),
              Validators.max(input.max)
            ]);
            break;
          case "DROPDOWN":
            f[input.id] = new FormControl(input.multiple ? [] : "",
              input.required ? Validators.required : this.NoValidation);
            break;
          case "EMAIL":
            f[input.id] = new FormControl("",[
              input.required ? Validators.required : this.NoValidation,
              Validators.email
            ]);
            break;
          case "URL":
            f[input.id] = new FormControl("",[
              input.required ? Validators.required : this.NoValidation,
              Validators.pattern(this.urlRegEx)
            ]);
            break;
          case "CHECKBOX":
            f[input.id] = false;
            break;
          default:
            f[input.id] = new FormControl("", input.required ? Validators.required : this.NoValidation);
        }
      });
      this.form = this.builder.group(f);
    });
  }

  NoValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return null;
    }
  }

  public getJSON(): Observable<any> {
    return this.http.get('assets/test.json');
  }

  autoCalculate(operation: string) {
    console.log(operation);
  }

  toggle(checked: boolean, field: any) {
    this.form.patchValue({
      field: checked
    })
  }

  onSubmit() {
    this.submited = true;
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.getRawValue()));
    }
  }

}
