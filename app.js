'use strict';

const
    defaultName = "No name NPC",
    defaultHealth = 100,
    defaultPower = 1,
    deathHealth = 0;

class Figher {
    constructor(name, power, health) {
        this.name = name || defaultName;
        this.power = power || defaultPower;
        this.health = health || defaultHealth;
    }

    setDamage(damage) {
        this.health -= damage;
        printHealth(this.health);
    }

    hit(enemy, point) {
        let damage = point * this.power;
        enemy.setDamage(damage);
    }
}

class ImprovedFighter extends Figher {
    doubleHit(enemy, point) {
        super.hit(enemy, point * 2)
    }
}

let printHealth = (health) => console.log(`Remaining health: ${health}`);
let getWinner = (fighter) => console.log(`The winner is ${fighter.name}, remaining health: ${fighter.health}`);

let fight = (fighter, improvedFighter, ...point) => {
    for (let i = 0; i < point.length; i++) {
        if (i % 2 === 0) {
            fighter.hit(improvedFighter, point[i]);
            if (isDead(improvedFighter)) {
                getWinner(fighter);
                break;
            }
        } else {
            improvedFighter.doubleHit(fighter, point[i]);
            if (isDead(fighter)) {
                getWinner(improvedFighter);
                break;
            }
        }
    }
};

let isDead = (fighter) => {
    return fighter.health <= deathHealth;
};

let fighter = new Figher("Alex", 1, 100);
let improvedFighter = new ImprovedFighter("Stas", 1, 100);

fight(fighter, improvedFighter, 8, 6, 22, 15, 9, 36, 7, 10, 11, 65);