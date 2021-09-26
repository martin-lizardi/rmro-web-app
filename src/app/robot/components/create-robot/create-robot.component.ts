import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-robot',
  templateUrl: './create-robot.component.html',
  styleUrls: ['./create-robot.component.scss'],
})
export class CreateRobotComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      alias: ['', [Validators.required]],
      serial_number: ['', [Validators.required]],
      model: ['', [Validators.required]],
    });
  }

  saveRobot(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      // Save data
    }
    console.log(this.form.value);
  }
}
