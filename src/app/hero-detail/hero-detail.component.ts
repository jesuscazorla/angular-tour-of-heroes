import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  public show: boolean = false;
  public buttonName: string = "Add/Modify Super Powers"
  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location){}

  ngOnInit(): void{
    this.getHero();
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  typesofSuperpowers: string[] = ['Fly', 'Invulnerability', 'Strength', 'Invisibility', 'Teleportation', 'Shapeshifting'];

  showList(): void {
    this.show = !this.show;

    // Change the name of the button.
    if(this.show)
      this.buttonName = "Close list";
    else
      this.buttonName = "Add/Modify Super Powers";
  }

  onSelection(e: any,v: any, hero: Hero){
    var current_selected = e.option.value;
    this.changeSuperPower(current_selected, hero);
  }

  changeSuperPower(selected: any, hero: Hero): void{
      var index = hero.superpowers.findIndex(selected);
      if(index > -1){
        hero.superpowers.splice(index, hero.superpowers.length-index-1);
      }else{
        hero.superpowers.push(selected);
      }
    }
  }

