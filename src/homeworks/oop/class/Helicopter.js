class Helicopter extends Vehicle {
    constructor(name, owner, productionYear, cost, maxSpeed, maxHeight, countOfPilots) {
        super(name, owner, productionYear, cost, maxSpeed);
        this.maxHeight = maxHeight;
        this.countOfPilots = countOfPilots;
    }

    static getWithMaxHeightGreaterThan(helicopters, height) {
        return helicopters.filter(h => h.maxHeight > height);
    }

    print() {
        super.print();
        console.log(`        Max height: ${this.maxHeight}
        Count of pilots: ${this.countOfPilots}`);
    }
}