class Vehicle {
    constructor(name, owner, productionYear, cost, maxSpeed) {
        this.name = name;
        this.owner = owner;
        this.productionYear = productionYear;
        this.cost = cost;
        this.maxSpeed = maxSpeed;
    }

    age() {
        return new Date().getFullYear() - this.productionYear;
    }

    engineOn() {
        console.log("Engine start working.");
    }

    engineOff() {
        console.log("Engine end working.");
    }

    print() {
        console.log(`Vehicle info:
        Name: ${this.name}
        Owner: ${this.owner}
        Production year: ${this.productionYear}
        Cost: ${this.cost}
        Max speed: ${this.maxSpeed}`);
    }
}