import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private animalList = [
    {
      'title': 'Vache',
      'image': 'imgs/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'imgs/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'imgs/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'imgs/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'imgs/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'imgs/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'imgs/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'imgs/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'imgs/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];

  private choosenAnimal;

  private choosenIndex;

  private media = null;

  private showReorder = false;
  
   constructor(public toastCtrl: ToastController) {
  }

  onAnimalClick(animal) {

    let toastText;
    let toastClass;

    if(!this.choosenAnimal){
      toastText = " Cliques d'abord sur JOUER pour entendre un animal";
      toastClass = "";
    }else if (this.choosenAnimal == animal) {
      toastText = "Tu as gagné";
      toastClass = "goodAnswer";

      this.choosenAnimal.playing = false;
      this.choosenAnimal = null;
      this.media = null;
    } else {
      toastText = "Essaie encore";
      toastClass = "badAnswer";
    }

    this.toastCtrl.create(
      {
        message: toastText,
        duration: 1500,
        position: "middle",
        cssClass: toastClass
      }
    ).present();
  }

  playSound() {

    if (this.media && (this.media.currentTime < this.media.duration)) {
      this.media.pause();
      if (this.choosenAnimal) {
        this.choosenAnimal.playing = false;
      }
    }

    let index = Math.floor(Math.random() * this.animalList.length);
    this.choosenAnimal = this.animalList[index];
    this.choosenIndex = index;

    this.media = new Audio();
    this.media.src = "assets" + this.choosenAnimal.file;
    this.media.load();
    this.media.play();

    this.choosenAnimal.playing = true;

    var that = this;
    this.media.ontimeupdate = function () {
      if (this.ended && that.choosenAnimal) {
        that.choosenAnimal.playing = false;
      }

    }

  }

  deleteAnimal(pos){
    this.animalList.splice(pos, 1);
  }
}
