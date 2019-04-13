import { autoinject } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router'
import { HttpClient, json } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IColour } from '../interfaces/icolour';
import { IPerson } from '../interfaces/iperson';

@autoinject
export class PersonEdit {

  constructor(private http: HttpClient, private router: Router) { }

  private heading: string;
  private person: Person;
  private colourOptions: IColour[] = [];
  private routerConfig: RouteConfig;

  async activate(params, routerConfig: RouteConfig) {
    this.routerConfig = routerConfig;

    const personResponse = await this.http.fetch(`/people/${params.id}`);
    this.personFetched(await personResponse.json());

    const colourResponse = await this.http.fetch('/colours');
    this.colourOptions = await colourResponse.json() as IColour[];
  }

  personFetched(person: IPerson): void {
    this.person = new Person(person)
    this.heading = `Update ${this.person.fullName}`;
    this.routerConfig.navModel.setTitle(`Update ${this.person.fullName}`);
  }

  colourMatcher(favouriteColour: IColour, checkBoxColour: IColour) {
    return favouriteColour.id === checkBoxColour.id;
  }

    async submit() {

        // TODO: Step 7
        //
        // Implement the submit and save logic.
        // Send a JSON request to the API with the newly updated
        // this.person object. If the response is successful then
        // the user should be navigated to the list page.


        //step 1 get the values
        //step 2 update the person and receive that person with a callback
        //step 3 send json request to the api
        //step 4 use if to check response and
        //route to listpage if successful

        //need to be able to log what receive from submit
        //you do that using aurelia forms checked.bind

        //from the bind
        //these values are a person update
        //were in a ts should it be a javascript object amd them converted when receive
        // PersonUpdate personToUpdate = new PersonUpdate{
        // Authorised = this.person.authorised,
        // Enabled = this.person.enabled,
        // Colours = this.person.colours
        // };


        //says newly updated so am I supposed to be using the name updates
        //dont need type doing it for my sanity
        var personsUpdate = {
            Authorised: this.person.authorised,
            Enabled: this.person.enabled,
            Colours: this.person.colours
        };

        //dont know why but think i can grab id like this

       var personsToUpdateId =  ${ this.person.id  };

        //think this needs sending to this somehow
        // [HttpPut("{id}")]
        //public IActionResult Update(int id, PersonUpdate personUpdate)
        // or use this like above
        //const personResponse = await this.http.fetch(`/people/${params.id}`);
        //this.personFetched(await personResponse.json());
        //javascript would be app.put
        
        // postData('Update', {:}) - something liek this

        //with an id i could send this to update but what is the update
        //the word in the '/****' is the word after app in the route at the top of the controller
        //think i send it with httpput{id}
        //or //this.router.navigate('id'); but id has two definition but only one takes

        //fetch('https://example.com/profile/avatar', {
        //method: 'PUT',
       //     body: formData
   // })

       // httpClient.fetch('http://jsonplaceholder.typicode.com/posts/1', {
       //     method: "PUT",
       //     body: JSON.stringify(myUpdateData)
      //  })

        //information so ...

        //does the update function actually do the navigating??

      //checked bind holds the values
      //${person.authorised} may work maybe need to use something before like
      //control which is the div class or field  or something from submit
      //do i need model.bind to connect to the model.cs

        //if the update function doesnt navigate (its put not get)
        //this.router.navigate('list');


       // https://www.tutorialspoint.com/aurelia/aurelia_http.htm - clues

        //we receive a person currently not a JSON
      //var UpdatedPersonReturned = await this.http.fetch(`/people/${params.id:this.personsToUpdateId, params.personUpdate: personsUpdate }`);
        // var UpdatedPersonReturned = await this.http.fetch(`/ people / ${personsToUpdateId, personsUpdate }`);
        var UpdatedPersonReturned = await this.http.fetch(`/ people / ${this.person.id, personsUpdate}`);

        //maybe better to send a string or something 
        //check list is the route
        if (UpdatedPersonReturned != NotFoundResult ) { this.router.navigate('list'); }

        throw new Error('Not Implemented');
  }

  cancel() {
    this.router.navigate('people');
  }
}
