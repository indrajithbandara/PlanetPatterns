﻿class PlanetPatternsGame {

    static GameWidth: number = 800;
    static GameHeight: number = 600;
    game: Phaser.Game;

    sun: Sun;
    planets: Planet[];
    trajectories: PIXI.Graphics;
    counter: number;

    constructor() {
        this.game = new Phaser.Game(PlanetPatternsGame.GameWidth, PlanetPatternsGame.GameHeight, Phaser.AUTO, 'content', { preload: this.preload.bind(this), create: this.create.bind(this), render: this.render.bind(this) });
    }

    preload() {
        this.sun = new Sun(PlanetPatternsGame.GameWidth / 2, PlanetPatternsGame.GameHeight / 2, 50);
        this.planets = [];
        this.counter = 0;
    }

    create() {

        var planet1 = new Planet(10, 4.5, 60);
        var planet2 = new Planet(20, 3, 120);
        var planet3 = new Planet(15, 2, 200);
        var planet4 = new Planet(50, 1, 290);
        var planet5 = new Planet(2, 4, 75);
        
        this.planets.push(planet1);
        this.planets.push(planet2);
        this.planets.push(planet3);
        this.planets.push(planet4);
        this.planets.push(planet5);

        this.trajectories = this.game.add.graphics(0, 0);
        
        this.sun.Gfx = this.game.add.graphics(this.sun.X, this.sun.Y);

        // Draw sun
        this.sun.Gfx.lineStyle(0);
        this.sun.Gfx.beginFill(0xFDBF0A);
        this.sun.Gfx.drawCircle(0, 0, this.sun.Diameter);
        this.sun.Gfx.endFill();

        // Draw planets
        for (var i = 0; i < this.planets.length; i++) {
            var planet = this.planets[i];
            
            planet.Gfx = this.game.add.graphics(this.sun.X + planet.Distance, this.sun.Y + planet.Distance);
            planet.Gfx.lineStyle(0);
            planet.Gfx.beginFill(0x17EFC8);
            planet.Gfx.drawCircle(0, 0,
                planet.Diameter);
            planet.Gfx.endFill();
        }
    }

    render() {

        for (var i = 0; i < this.planets.length; i++) {
            var planet = this.planets[i];
            
            planet.Gfx.x = this.sun.X + planet.Distance * Math.sin(this.DegToRad(planet.Degrees));
            planet.Gfx.y = this.sun.Y + planet.Distance * Math.cos(this.DegToRad(planet.Degrees));

            planet.Degrees += planet.Velocity;

            //this.trajectories.lineStyle(0);
            //this.trajectories.beginFill(0xffffff);
            //this.trajectories.drawRect(planet.Gfx.x, planet.Gfx.y, 1, 1);
            //this.trajectories.endFill();
        }

        if (this.counter == 4) {
            this.trajectories.lineStyle(1, 0xffffff);
            this.trajectories.beginFill(0xffffff);
            this.trajectories.moveTo(this.planets[0].Gfx.x, this.planets[0].Gfx.y);
            this.trajectories.lineTo(this.planets[2].Gfx.x, this.planets[2].Gfx.y);
            this.trajectories.endFill();

            this.trajectories.lineStyle(1, 0xff0000);
            this.trajectories.beginFill(0xff0000);
            this.trajectories.moveTo(this.planets[1].Gfx.x, this.planets[1].Gfx.y);
            this.trajectories.lineTo(this.planets[3].Gfx.x, this.planets[3].Gfx.y);
            this.trajectories.endFill();

            this.counter = 0;
        }

        this.counter++;
    }

    private DegToRad(deg) {
        return deg * Math.PI / 180;
    }

}

window.onload = () => {

    var game = new PlanetPatternsGame();

};