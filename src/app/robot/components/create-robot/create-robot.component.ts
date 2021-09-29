import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Robot, RobotService } from 'src/app/core/services/robot/robot.service';

@Component({
  selector: 'app-create-robot',
  templateUrl: './create-robot.component.html',
  styleUrls: ['./create-robot.component.scss'],
})
export class CreateRobotComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private robotService: RobotService,
    private router: Router
  ) {
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

  async saveRobot(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      const { alias, serial_number, model } = this.form.value;
      const newRobot: Robot = {
        alias,
        serial_number,
        model,
        logged: false,
        logged_dates: [],
        in_work: false,
        created_date: new Date().toLocaleDateString(),
        updated_date: '',
      };

      this.robotService
        .createRobot(newRobot)
        .then(() => this.router.navigate(['/home']))
        .catch(() => alert('¡Oops, algo salió mal!'));
    }
    console.log(this.form.value);
  }
}
