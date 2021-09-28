import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RobotService } from 'src/app/core/services/robot/robot.service';

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
      const newRobot: any = {
        alias,
        serial_number,
        model,
      };

      try {
        const res = await this.robotService.createRobot(newRobot);
        console.log(res);
        this.router.navigate(['/home']);
      } catch (error) {
        console.log(error);
        alert('¡Oops, algo salió mal!');
      }
    }
    console.log(this.form.value);
  }
}
