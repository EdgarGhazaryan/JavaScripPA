class Ship extends Vehicle {
    constructor(name, owner, productionYear, cost, maxSpeed, countOfCrew) {
        super(name, owner, productionYear, cost, maxSpeed);
        this.countOfCrew = countOfCrew;
    }

    static getWithCrewGreaterThan(ships, count) {
        return ships.filter(ship => ship.countOfCrew > count);
    }

    print() {
        super.print();
        console.log(`        Count of crew: ${this.countOfCrew}`);
    }
}