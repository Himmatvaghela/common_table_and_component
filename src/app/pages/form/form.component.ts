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

  listForInfiniteScroll: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  onScroll(event: any) {
    for (let i = 1; i <= 5; i++) {
      this.listForInfiniteScroll.push(this.listForInfiniteScroll.length + 1);
    }
  }

  searchText?: string;
  paragraph =
    'Angular is an awesome framework for building web applications. You can highlight any word in this paragraph.';
}
