import Unit from './unit';
import Icon from './icon';
class Sidebar {
    constructor(traits, units){
        this.units = units;
        this.traits = traits.sort((x,y) => {
            if(x.name < y.name) return -1;
            return 1;
        })

        this.makeChamps();
        this.divs = {origins: document.querySelector('#origins'), classes: document.querySelector('#classes'), legendary: document.querySelector('#legendary')};

        this.synergies = { 
            origins: [
            "A.D.M.I.N.", 
            "Anima Squad",
            "Civilian",
            "Gadgeteen",
            "LaserCorps",
            "Mecha:PRIME",
            "Ox Force",       
            "Supers",
            "Star Guardian",
            "Threat",
            "Underground",
            "admin",
            "mech prime"
        ],
            legendary: [
            "Arsenal",
            "Corrupted",
            "Forecaster"
        ],
            classes: [
            "Ace",
            "Aegis",
            "Brawler",
            "Defender",
            "Duelist",            
            "Hacker",
            "Heart",
            "Mascot",
            "Prankster",
            "Recon",
            "Renegade",
            "Spellslinger",
            "Sureshot"
        ]}
        this.appendDivs();
        this.search = document.getElementById("searchTrait");
        this.handleSearch = this.handleSearch.bind(this);
        this.search.addEventListener("keyup", this.handleSearch)
    }
    handleSearch(e){
        e.preventDefault();
        // this.search.value.toLowerCase()
    }

    appendDivs(){
        this.traits.forEach(trait => {
            const div = document.createElement('div');
            this.appendH3(div, trait);
            this.appendImg(div, trait);
            this.appendDesc(div, trait);
            if(this.synergies.origins.includes(trait.name)) this.divs.origins.append(div);
            if(this.synergies.classes.includes(trait.name)) this.divs.classes.append(div);
            if(this.synergies.legendary.includes(trait.name)) this.divs.legendary.append(div);
        })
    }

    appendH3(div, trait){
        const label = document.createElement('h3');
        label.innerHTML = `${trait.name}`
        div.append(label);
    }

    appendImg(div, trait){
        const p = document.createElement('p')
        this.champs.forEach(champ => {
            if (champ.traits.includes(trait.name)){
                const icon = new Icon(champ, 35, 35);
                p.append(icon.ele);
            };
        })
        div.append(p);
    }

    appendDesc(div, trait){
        const p = document.createElement('p');
        p.innerHTML = trait.desc;
        div.append(p);
    }

    makeChamps(){
        const invalidUnits = ["Volcanic Sol", "Giant Crabgot", "Hackerim", "Mutant Zac"];
        this.champs = [];
        for(let i = 0; i<this.units.length; i++) {
            const champ = new Unit(this.units[i]);
            if(!invalidUnits.includes(champ.name)){
                this.champs.push(champ);
            }
        }
        this.champs.sort((x,y) => {
            if (x.cost < y.cost) return -1;
            return 1;
        });
    }
}

export default Sidebar;