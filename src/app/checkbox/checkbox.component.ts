import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SizeKey, ToppingKey } from 'src/data';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent {
  @Input() topping!: ToppingKey;
  @Input() size!: SizeKey;

  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  clicked() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}
