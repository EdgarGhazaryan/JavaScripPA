class Train extends Vehicle {
    constructor(name, owner, productionYear, cost, maxSpeed, countOfWheels, typeOfRails) {
        super(name, owner, productionYear, cost, maxSpeed);
        this.countOfWheels = countOfWheels;
        this.typeOfRails = typeOfRails;
    }

    fuelExpense() {
        return (1 / this.productionYear) * this.maxSpeed * 99;
    }

    static getWithRail(trains, rail) {
        return trains.filter(train => train.typeOfRails === rail);
    }

    print() {
        super.print();
        console.log(`        Count of wheels: ${this.countOfWheels}
        Type of rails: ${this.typeOfRails}`);
    }
}
