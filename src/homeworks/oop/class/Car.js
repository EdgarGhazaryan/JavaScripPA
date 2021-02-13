class Car extends Vehicle {
    constructor(name, owner, productionYear, cost, maxSpeed, powerOfEngine, countOfDoors) {
        super(name, owner, productionYear, cost, maxSpeed);
        this.powerOfEngine = powerOfEngine;
        this.countOfDoors = countOfDoors;
    }

    fuelExpense() {
        return (1 / this.productionYear) * this.maxSpeed * 77;
    }

    static getWithEnginePowerfulThan3(cars, power) {
        return cars.filter(car => car.powerOfEngine > power);
    }

    print() {
        super.print();
        console.log(`        Power of engine: ${this.powerOfEngine}
        Count of doors: ${this.countOfDoors}`);
    }
}