import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  formSubmit(e: any) {
    console.log(e);
  }

  obj: any = {
    id: { name: { realName: 'Rahul' } },
  };
}
