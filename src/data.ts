
export const sizes = {
    'Small': 5,
    'Medium': 7,
    'Large': 8,
    'Extra Large': 9
};
export type SizeKey = keyof typeof sizes;
export const SizeKeys = Object.keys(sizes) as SizeKey[];

export const toppings = {
    'Tomatoes': { Cost: 1, IsVegetable: true },
    'Onions': { Cost: 0.5, IsVegetable: true },
    'Bell peppers': { Cost: 1, IsVegetable: true },
    'Mushrooms': { Cost: 1.2, IsVegetable: true },
    'Pineapple': { Cost: 0.75, IsVegetable: true },
    'Sausage': { Cost: 1, IsVegetable: false },
    'Pepperoni': { Cost: 2, IsVegetable: false },
    'Barbecue chicken': { Cost: 3, IsVegetable: false }
};
export type ToppingKey = keyof typeof toppings;
export const ToppingKeys = Object.keys(toppings) as ToppingKey[];

export type DiscountCheck = (size: SizeKey, toppings: ToppingKey[], total: number) => { Title: string, NewTotal: number } | null;
export const discountChecks: DiscountCheck[] = [
    (size, toppings, _) => {
        if (size === 'Medium' && toppings.length === 2) {
            return { Title: 'Offer1', NewTotal: 5 };
        }

        return null;
    },
    (size, toppings, total) => {
        const pepperoni: ToppingKey = 'Pepperoni';
        const bbqChicken: ToppingKey = 'Barbecue chicken';

        if (size !== 'Large') {
            return null;
        }

        let toppingCount = toppings.length;
        if (toppings.includes(pepperoni)) {
            toppingCount += 1;
        }

        if (toppings.includes(bbqChicken)) {
            toppingCount += 1;
        }

        if (toppingCount === 4) {
            return { Title: 'Offer3', NewTotal: total * 0.5 };
        }

        return null;
    }
];

export interface Topping {
    Cost: number;
    IsVegetable: boolean;
}