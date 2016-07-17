/* tslint:disable forin */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const hero_1 = require('./hero');
const hero_detail_component_1 = require('./hero-detail.component');
const my_click_directive_1 = require('./my-click.directive');
// Alerter fn: monkey patch during test
function alerter(msg) {
    window.alert(msg);
}
exports.alerter = alerter;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(exports.Color || (exports.Color = {}));
var Color = exports.Color;
;
/**
 * Giant grab bag of stuff to drive the chapter
 */
let AppComponent = class AppComponent {
    constructor() {
        this.actionName = 'Go for it';
        this.alert = alerter;
        this.badCurly = 'bad curly';
        this.classes = 'special';
        this.canSave = true;
        this.Color = Color;
        this.color = Color.Red;
        this.currentHero = hero_1.Hero.MockHeroes[0];
        this.evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
        this.title = 'Template Syntax';
        this.heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
        this.iconUrl = 'https://angular.io/resources/images/logos/standard/shield-large.png';
        this.clicked = '';
        this.clickMessage = '';
        this.clickMessage2 = '';
        //iconUrl = 'images/ng-logo.png';
        this.isActive = false;
        this.isSpecial = true;
        this.isUnchanged = true;
        this.nullHero = null; // or undefined
        this.product = {
            name: 'frimfram',
            price: 42
        };
        this.samenessCount = 5;
        this.toeChoice = '';
        this.val = 2;
        this.villainImageUrl = 'http://www.clker.com/cliparts/u/s/y/L/x/9/villain-man-hi.png';
        this.heroesNoTrackByChangeCount = 0;
        this.heroesWithTrackByChangeCount = 0;
    }
    ngOnInit() {
        this.refreshHeroes();
    }
    ngAfterViewInit() {
        this.detectNgForTrackByEffects();
    }
    callFax(value) { this.alert(`Faxing ${value} ...`); }
    callPhone(value) { this.alert(`Calling ${value} ...`); }
    colorToggle() { this.color = (this.color === Color.Red) ? Color.Blue : Color.Red; }
    deleteHero(hero) {
        this.alert('Deleted hero: ' + (hero && hero.firstName));
    }
    getStyles(el) {
        let styles = window.getComputedStyle(el);
        let showStyles = {};
        for (let p in this.setStyles()) {
            showStyles[p] = styles[p];
        }
        return JSON.stringify(showStyles);
    }
    getVal() { return this.val; }
    onCancel(event) {
        let evtMsg = event ? ' Event target is ' + event.target.innerHTML : '';
        this.alert('Canceled.' + evtMsg);
    }
    onClickMe(event) {
        let evtMsg = event ? ' Event target class is ' + event.target.className : '';
        this.alert('Click me.' + evtMsg);
    }
    onSave(event) {
        let evtMsg = event ? ' Event target is ' + event.target.innerText : '';
        this.alert('Saved.' + evtMsg);
    }
    onSubmit(form) {
        let evtMsg = form.valid ?
            ' Form value is ' + JSON.stringify(form.value) :
            ' Form is invalid';
        this.alert('Form submitted.' + evtMsg);
    }
    // update this.heroes with fresh set of cloned heroes
    refreshHeroes() {
        this.heroes = hero_1.Hero.MockHeroes.map(hero => hero_1.Hero.clone(hero));
    }
    moreOfTheSame() { this.samenessCount++; }
    ;
    get sameAsItEverWas() {
        let result = Array(this.samenessCount);
        for (let i = result.length; i-- > 0;) {
            result[i] = 'same as it ever was ...';
        }
        return result;
        // return [1,2,3,4,5].map(id => {
        //   return {id:id, text: 'same as it ever was ...'};
        // });
    }
    setUpperCaseFirstName(firstName) {
        // console.log(firstName);
        this.currentHero.firstName = firstName.toUpperCase();
    }
    setClasses() {
        let classes = {
            saveable: this.canSave,
            modified: !this.isUnchanged,
            special: this.isSpecial,
        };
        // compensate for DevMode (sigh)
        if (JSON.stringify(classes) === JSON.stringify(this.priorClasses)) {
            return this.priorClasses;
        }
        this.priorClasses = classes;
        return classes;
    }
    setStyles() {
        let styles = {
            // CSS property names
            'font-style': this.canSave ? 'italic' : 'normal',
            'font-weight': !this.isUnchanged ? 'bold' : 'normal',
            'font-size': this.isSpecial ? '24px' : '8px',
        };
        // compensate for DevMode (sigh)
        if (JSON.stringify(styles) === JSON.stringify(this._priorStyles)) {
            return this._priorStyles;
        }
        this._priorStyles = styles;
        return styles;
    }
    toeChooser(picker) {
        let choices = picker.children;
        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i];
            if (choice.checked) {
                return this.toeChoice = choice.value;
            }
        }
    }
    trackByHeroes(index, hero) { return hero.id; }
    trackById(index, item) { return item['id']; }
    detectNgForTrackByEffects() {
        this._oldNoTrackBy = toArray(this.childrenNoTrackBy);
        this._oldWithTrackBy = toArray(this.childrenWithTrackBy);
        this.childrenNoTrackBy.changes.subscribe((changes) => {
            let newNoTrackBy = toArray(changes);
            let isSame = this._oldNoTrackBy.every((v, i) => v === newNoTrackBy[i]);
            if (!isSame) {
                this._oldNoTrackBy = newNoTrackBy;
                this.heroesNoTrackByChangeCount++;
            }
        });
        this.childrenWithTrackBy.changes.subscribe((changes) => {
            let newWithTrackBy = toArray(changes);
            let isSame = this._oldWithTrackBy.every((v, i) => v === newWithTrackBy[i]);
            if (!isSame) {
                this._oldWithTrackBy = newWithTrackBy;
                this.heroesWithTrackByChangeCount++;
            }
        });
    }
};
__decorate([
    core_1.ViewChildren('noTrackBy'), 
    __metadata('design:type', core_1.QueryList)
], AppComponent.prototype, "childrenNoTrackBy", void 0);
__decorate([
    core_1.ViewChildren('withTrackBy'), 
    __metadata('design:type', core_1.QueryList)
], AppComponent.prototype, "childrenWithTrackBy", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
        directives: [
            hero_detail_component_1.HeroDetailComponent, hero_detail_component_1.BigHeroDetailComponent,
            my_click_directive_1.MyClickDirective, my_click_directive_1.MyClickDirective2
        ]
    }), 
    __metadata('design:paramtypes', [])
], AppComponent);
exports.AppComponent = AppComponent;
// helper to convert viewChildren to an array of HTMLElements
function toArray(viewChildren) {
    let result = [];
    let children = viewChildren.toArray()[0].nativeElement.children;
    for (let i = 0; i < children.length; i++) {
        result.push(children[i]);
    }
    return result;
}
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */ 
//# sourceMappingURL=app.component.js.map