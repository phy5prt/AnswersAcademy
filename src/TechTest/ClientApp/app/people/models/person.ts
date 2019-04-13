import { computedFrom } from 'aurelia-framework';
import { IPerson } from '../interfaces/iperson';
import { IColour } from '../interfaces/icolour';

export class Person implements IPerson {

  constructor(person: IPerson) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.authorised = person.authorised;
    this.enabled = person.enabled;
    this.colours = person.colours;
  }

  id: number;
  firstName: string;
  lastName: string;
  authorised: boolean;
  enabled: boolean;
  colours: IColour[];

  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @computedFrom('fullName')
  get palindrome(): boolean {

    // TODO: Step 5
    //
    // Implement the palindrome computed field.
    // True should be returned When the FullName is spelt the same
    // forwards as it is backwards. The match should ignore any
    // spaces and should also be case insensitive.
    //
    // Example: 'Bo Bob' is a palindrome.

      //aurelias computed from function
      //remove spaces
      //could find middle point or go past the middlepoint for luck
      //run the compare using word[(i)] == word[length -1 -i] if not equal return false
      //only need to check to midpoint


      //probably leave as var as not C#
      var fullNameStr: string = this.fullName;
      var noSpacesStr: string = fullNameStr.replace(/ /g, "");
      var noSpacesLowerCaseStr: string = noSpacesStr.toLowerCase();

      //test this
      //mathfloor not ceiling because if an odd length the middle letter is the same
      //number forwards or backwards and if its even floor has no effect
      for (var i = 0; i < Math.floor((noSpacesLowerCaseStr.length / 2)); i++) {

          if (noSpacesLowerCaseStr[i] !== noSpacesLowerCaseStr[noSpacesLowerCaseStr.length -1 -i]
              ) {
              //if alway get false maybe were only returning from the loop
              return false;
          }
      }




    return true;
  }
}
