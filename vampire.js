class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamps = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfVamps++;
    }

    return numberOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal >= vampire.numberOfVampiresFromOriginal) {
      return false;
    } else {
      return true;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // console.log(name);

    if (this.name === name) {
      return this;
    } else {
      for (let vampire of this.offspring) {
        // console.log('vampire: ',vampire);
        // console.log('this.offspring: ',this.offspring);
        if (vampire.vampireWithName(name)) {
          return vampire.vampireWithName(name);
        }
      }
      return null;
    }

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;
    // console.log(this.offspring);

    for (let vampire of this.offspring) {
      totalDescendents += vampire.totalDescendents + 1;
    }
    return totalDescendents;
  }


  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenialDescendents = [];
    // console.log(this.offspring);

    if (this.yearConverted > 1980) {
      millenialDescendents.push(this);
    }

    for (let vampire of this.offspring) {
      millenialDescendents = millenialDescendents.concat(vampire.allMillennialVampires);
    }
    return millenialDescendents;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    console.log('this.creator: ',this.creator);
    console.log('this.name: ',this.name);
    console.log('vampire.name: ',vampire.name);

    if (this.creator === null) {
      return this;
    } else if (vampire.creator === null) {
      return vampire;
    } else if (this === vampire) {
      return this;
    } else if (this.creator === vampire.creator) {
      return this.creator;
    } else if (this === vampire.creator) {
      return this;
    } else if (this.creator === vampire) {
      return this.creator;
    } else if (this.creator.creator !== null) {
      return this.creator.closestCommonAncestor(vampire);
    } else if (vampire.creator.creator !== null) {
      return this.closestCommonAncestor(vampire.creator);
    }

  }
}

module.exports = Vampire;

let original = new Vampire('Original', 1500);
let ansel = new Vampire('Ansel', 1670);
let bart = new Vampire('Bart', 1675);
let elgort = new Vampire('Elgort', 1784);
let sarah = new Vampire('Sarah', 1759);
let andrew = new Vampire('Andrew', 1853);
original.addOffspring(ansel);
original.addOffspring(bart);
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);
elgort.addOffspring(andrew);
// console.log('original: ',original);
// console.log('ansel: ',ansel);
// console.log('bart: ',bart);

console.log('result: ',bart.closestCommonAncestor(original));
