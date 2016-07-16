export class Hero {
    static nextId = 1;

    static MockHeroes = [
        new Hero(
            'Hercules',
            'Son of Zeus',
            new Date(1970, 1, 25),
            'http://www.imdb.com/title/tt0065832/',
            325
        ),
        new Hero('eenie', 'toe'),
        new Hero('Meanie', 'Toe'),
        new Hero('Miny', 'Toe'),
        new Hero('Moe', 'Toe')
    ];

    public id:number;
}