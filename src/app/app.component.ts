import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'test-app';
  streamForm: FormGroup;
  validName = new RegExp(/^[A-Za-z0-9\s]+$/);

  ngOnInit(): void {
    this.streamForm = new FormGroup({
      name: new FormControl('dan', [ Validators.required, Validators.maxLength(9), Validators.pattern(this.validName) ]),
    });

    this.valueChange();
  }

  valueChange(): void {
    this.streamForm.get('name').valueChanges.subscribe(
      (value: any) => {
        // Define values
        let streamName = value;
        // Create invalid regexp
        const invalid = new RegExp(/[A-Za-z0-9 ]+/g);
        // Get any invalid characters in our string
        const invalidChar = streamName.replace(invalid, '');

        console.log('value = ', value);
        console.log('invalid char = ', invalidChar);
        console.log('test = ', this.validName.test(value));

        if (!this.validName.test(streamName)) {
          this.streamForm.get('name').setErrors( { validation_fail: true } );

          streamName = streamName.replace(invalidChar, '');

          if (streamName !== value) {
            this.streamForm.get('name').setValue(streamName);
          }
        }
      }
    );
  }
}
