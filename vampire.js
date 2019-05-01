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

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this.creator === vampire) {
      return vampire;
      console.log('1st. case: ',vampire);
    } else if (this.creator === vampire.creator) {
      return this.creator;
      console.log('2nd. case: ',this.creator);
    } else if (this === vampire.creator) {
      return this;
      console.log('3rd. case: ',this);
    } else if (this.creator === null) {
      return this.creator;
    } else if (vampire.creator === null) {
      return vampire.creator;
    } else if (this.creator.creator === null) {
      return this.creator.creator;
    } else if (vampire.creator.creator === null) {
      return vampire.creator.creator;
    } else {
      return this.creator.closestCommonAncestor(vampire);
      console.log('4th. case: ',this.creator.closestCommonAncestor(vampire));
    }
  }
}

module.exports = Vampire;

// let original = new Vampire('Original', 1500);
// let ansel = new Vampire('Ansel', 1670);
// let bart = new Vampire('Bart', 1675);
// let elgort = new Vampire('Elgort', 1784);
// let sarah = new Vampire('Sarah', 1759);
// let andrew = new Vampire('Andrew', 1853);
// original.addOffspring(ansel);
// original.addOffspring(bart);
// ansel.addOffspring(elgort);
// ansel.addOffspring(sarah);
// elgort.addOffspring(andrew);
// console.log('original: ',original);
// console.log('ansel: ',ansel);
// console.log('bart: ',bart);

// console.log(bart.closestCommonAncestor(sarah));
