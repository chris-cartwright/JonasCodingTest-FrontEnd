import { Component, OnInit } from '@angular/core';
import { SizeKey, SizeKeys, ToppingKey, ToppingKeys, discountChecks, sizes, toppings } from 'src/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  get pizzaSizes() {
    return SizeKeys.map(s => { return { Title: s, Cost: sizes[s] }; });
  }

  get toppings() {
    return ToppingKeys.map(t => { return { Title: t, ...toppings[t] }; });
  }

  get vegetableToppings() {
    return this.toppings.filter(t => t.IsVegetable);
  }

  get nonVegetableToppings() {
    return this.toppings.filter(t => !t.IsVegetable);
  }

  order: { [size in SizeKey]: { [title in ToppingKey]: boolean } } = {} as any;
  total: { [size in SizeKey]: number | null } = {} as any;
  discounts: { [size in SizeKey]: { Name: string, Amount: number } | null } = {} as any;

  ngOnInit(): void {
    for (let size of SizeKeys) {
      this.total[size] = null;
      this.discounts[size] = null;

      let row: any = {};
      for (let topping of ToppingKeys) {
        row[topping] = false;
      }
      this.order[size] = row;
    }
  }

  changeTopping(value: boolean, size: SizeKey, topping: ToppingKey) {
    this.order[size][topping] = value;
    this.updateTotal();
  }

  updateTotal() {
    for (let size of SizeKeys) {
      let total = 0;
      let selected: ToppingKey[] = [];
      for (let topping of ToppingKeys) {
        if (this.order[size][topping]) {
          total += toppings[topping].Cost;
          selected.push(topping);
        }
      }

      if (total > 0) {
        total += sizes[size];
        let offer = this.getDiscount(size, selected, total);
        if (offer != null) {
          this.total[size] = offer.NewTotal;
          this.discounts[size] = { Name: offer.Title, Amount: total - offer.NewTotal };
        }
        else {
          this.total[size] = total;
          this.discounts[size] = null;
        }
      }
      else {
        this.total[size] = null;
      }
    }
  }

  getDiscount(size: SizeKey, toppings: ToppingKey[], total: number) {
    for (let check of discountChecks) {
      let res = check(size, toppings, total);
      if (res !== null) {
        return res;
      }
    }

    return null;
  }
}