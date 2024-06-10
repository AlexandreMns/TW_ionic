export class Autor{
    name:string;
    alternateName:[string];
    birthDate:string;
    deathDate:string;
    bio:string;
    id:string;

    constructor(name: string, alternateName: [string], birhtDate: string, deathDate: string, bio: string, id: string) {
        this.name = name;
        this.alternateName = alternateName;
        this.birthDate = birhtDate;
        this.deathDate = deathDate;
        this.bio = bio;
        this.id = id;
    }
}