/* VARS */



/* EVENTS */


/* FUNCTIONS */

function Player(name, strength, healthy) {
    this.name = name;
    this.strength = strength;
    this.healthy = healthy;
    this.callEle = new loadEles(this.name);
};

function loadEles(name) {
    this.controls = document.querySelector(`.${name} .player__controls`);
    this.attackBtn = document.querySelector(`.${name} .player__attack`);
    this.healthBtn = document.querySelector(`.${name} .player__health`);
    this.statusBtn = document.querySelector(`.${name} .player__status`);
    this.lost = document.querySelector(`.${name} .player__lost`);
    this.progress = document.querySelector(`.${name} .health__percent`);
    this.playerHealthyAttr = document.querySelector(`.${name} .player__healthy`);
};


Player.prototype.attack = function(opponent) {
    if (opponent.healthy > 0) {
        opponent.healthy -= this.strength;
        opponent.callEle.progress.style.width = `${opponent.healthy}%`;
        opponent.callEle.playerHealthyAttr.dataset.percent = `${opponent.healthy}%`;
    } else {
        opponent.callEle.lost.innerHTML = `${opponent.name} is died`;
        opponent.callEle.controls.remove();
        opponent.callEle.progress.remove();
    }
};

Player.prototype.getHealth = function() {
    if (this.healthy < 100) this.healthy += 5;
    if (this.healthy > 100) this.healthy = 100;
    this.callEle.progress.style.width = `${this.healthy}%`;
    this.callEle.playerHealthyAttr.dataset.percent = `${this.healthy}%`;
};

Player.prototype.status = function() {
    if (document.querySelector(`.statusu.${this.name}`)) {
        document.querySelector(`.statusu.${this.name}`).remove();
    } else {
        const content = document.createElement('div');
        content.className = 'statusu' + ' ' + this.name;
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        p1.innerHTML = "Name: " + this.name;
        p2.innerHTML = "Healthy: " + this.healthy;
        p3.innerHTML = "Strength: " + this.strength;
        content.append(p1, p2, p3);
        this.callEle.controls.after(content);
    }

};


const Naruto = new Player('naruto', 10, 100);
const Sasuki = new Player('sasuki', 5, 100);

Naruto.callEle.attackBtn.addEventListener('click', () => Naruto.attack(Sasuki));
Naruto.callEle.healthBtn.addEventListener('click', () => Naruto.getHealth());

Sasuki.callEle.attackBtn.addEventListener('click', () => Sasuki.attack(Naruto));
Sasuki.callEle.healthBtn.addEventListener('click', () => Sasuki.getHealth());

Sasuki.callEle.statusBtn.addEventListener('click', () => Sasuki.status());
Naruto.callEle.statusBtn.addEventListener('click', () => Naruto.status());