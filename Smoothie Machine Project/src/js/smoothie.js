class Smoothie {
    constructor(customerName, size, base, fruits, addons) {
        this.customerName = customerName;
        this.size = size;
        this.base = base;
        this.fruits = fruits;
        this.addons = addons;
        this.price = this.calculatePrice(); // calc price when creating smoothie
    }

    calculatePrice() {
        let total = 0;
        // different prices for sizes
        if (this.size === 'small') {
            total += 5.99;
        } else if (this.size === 'medium') {
            total += 7.99;
        } else if (this.size === 'large') {
            total += 9.99;
        }
        
        // add extra cost for add-ons
        if (this.addons.includes('protein')) {
            total += 2.00;
        }
        if (this.addons.includes('honey')) {
            total += 0.50;
        }
        
        return total;
    }

    getDescription() {
        let description = `A ${this.size} smoothie made with ${this.base}`;
        
        if (this.fruits.length > 0) {
            description += ` and ${this.fruits.join(', ')}`;
        }
        
        if (this.addons.length > 0) {
            description += `. Add-ons: ${this.addons.join(', ')}`;
        }
        
        return description + '.';
    }

    // this shows all the smoothie info on the page
    displayInfo() {
        return `
            <div class="smoothie-info">
                <h3>Smoothie for ${this.customerName}</h3>
                <p><strong>Size:</strong> ${this.size}</p>
                <p><strong>Base:</strong> ${this.base}</p>
                <p><strong>Fruits:</strong> ${this.fruits.join(', ')}</p>
                <p><strong>Add-ons:</strong> ${this.addons.join(', ') || 'None'}</p>
                <p><strong>Description:</strong> ${this.getDescription()}</p>
                <p><strong>Total Price:</strong> $${this.price.toFixed(2)}</p>
            </div>
            <div class="smoothie-visual">
                <img src="images/smoothie.webp" alt="Your delicious smoothie" class="smoothie-image">
            </div>
        `;
    }
} 