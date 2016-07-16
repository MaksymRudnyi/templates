import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({selector: '[myClick]'})
export class MyClickDirective{
    @Output('myClick') clicks = new EventEmitter<string>();
    toggle = false;

    constructor(el: ElementRef){
        el.nativeElement
            .addEventListener('click', (event:Event) => {
                this.toggle = !this.toggle;
                this.clicks.emit(this.toggle ? 'Click!' : '');
            })
    }

}

@Directive({
    selector: '[myClick2]',
    outputs: '[clicks:myClick]'
})
export class MyClickDirective2{
    clicks = new EventEmitter<string>();
    toggle = false;

    constructor(el:ElementRef){
        el.nativeElement
            .addEventListener('click', (event: Event) => {
                this.toggle = !this.toggle;
                this.clicks.emit(this.toggle ? 'Click2!' : '')
            })
    }
}