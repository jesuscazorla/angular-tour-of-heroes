import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { map, of } from 'rxjs';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  public imgSrc: string = ""
  public show: boolean = false;
  public error: boolean = false;
  public buttonName: string = "Add new Super Power"
  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location){}

  ngOnInit(): void{
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => {
        for (let index in hero.superpowers){
          let aux = Object.values(hero.superpowers[index])
          hero.superpowers[index] = aux.pop()! ;
        }
        this.hero = hero
        this.getImage(this.hero.name);

      })

    }

  getImage(name: string): void{
    this.heroService.apiImages(name).subscribe(
      src => this.imgSrc = src
    )


  }

  goBack(): void {
    this.location.back();
  }


    showAddSuperpower(): void{
      this.show = !this.show;
      if(this.show){
        this.buttonName = "Close Add Menu";
      }else
        this.buttonName = "Add new Super Power";
    }
    addSuperpower(): void{
      var input = document.getElementById("superpower") as HTMLInputElement;
      var newsuperp = input.value;
      if(newsuperp.length > 0){
      if(!this.hero?.superpowers.includes(newsuperp)){
        this.hero?.superpowers.push(newsuperp);
        this.error = false;
      }else{
        this.error= true;
      }
    }

    }
    deleteSuperpower(superp: string): void {
      var index = this.hero?.superpowers.indexOf(superp)
      if(typeof index !== 'undefined' && index > -1){
        this.hero?.superpowers.splice(index, 1);
    }
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}

