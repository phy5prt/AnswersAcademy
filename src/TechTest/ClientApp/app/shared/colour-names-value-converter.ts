import { IColour } from '../people/interfaces/icolour';

export class ColourNamesValueConverter {

  toView(colours: IColour[]) {

    // TODO: Step 4
    //
    // Implement the value converter function.
    // Using the colours parameter, convert the list into a comma
    // separated string of colour names. The names should be sorted
    // alphabetically and there should not be a trailing comma.
    //
    // Example: 'Blue, Green, Red'

      //its a ts not CS does that mean i should be coding in something else


      //string coloursStr = "";
     // string commaSpace = ", ";

      var coloursStr: string = "";
      var commaSpace: string = ", ";

      //assuming colours is a list

      //if sort available
            colours.sort();
      //var i: number = 0;
      for (var i= 0; i < colours.length; i++) {

          //last one no comma
          if (i == (colours.length - 1)) {
              coloursStr += colours[i].name;
          } else {
              coloursStr += colours[i].name + commaSpace;



          }
      }


    return coloursStr;
  }

}
