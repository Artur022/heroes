import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {


  powers = [
    'Really Smart',
    'Super Flexible',
    'Super Hot',
    'Weather Changer'
  ];


  constructor(private heroService: HeroService) {
  }

  model = new Hero(0, '', this.powers[0], '')
  submitted = false

  onSubmit() {
    this.submitted = true
    console.log(this)
    this.heroService.addHero(this.model).subscribe(model => this.model = model)
  }


  ngOnInit(): void {

    const myHero = new Hero(
      42,
      'SkyDog',
      'Fetch any object at any distance',
      'Leslie Rollover'
    )
    // this.model = myHero

    console.log('My hero is called ' + myHero.name)

  }

  // newHero(): Hero {
  //   console.log(this)
  //   return {id: 1, name: '123'}
  // }


}
