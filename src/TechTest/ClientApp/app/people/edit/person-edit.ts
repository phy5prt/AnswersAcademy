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


        //send a json request but the method doesnt want a json object but instruction for it says it does in step 3

        //here im grabbing the person made by person fetched
        /*
        var personsUpdate = {
            Authorised: this.person.authorised,
            Enabled: this.person.enabled,
            Colours: this.person.colours
        };
        */
        var personsUpdate = {
            Authorised: ${ person.authorised },
            Enabled: ${ person.enabled },
            Colours: ${ person.colours }
    
    
        };
       
       var personsToUpdateId =  this.person.id;

        
        // this is where im going to try and send my object to, there is only one put so not sure i need id parameter [HttpPut("{id}")]
        


      //bind holds the values when the form activates the submit
      

        //Thoughts
       // https://www.tutorialspoint.com/aurelia/aurelia_http.htm - clues
         //https://github.com/mdn/fetch-examples - looked at
        //other links didnt help
       

      //if id refered not to the HTTP{id} but to the the method requiring (int id)  then the following may make more sense
      //var UpdatedPersonReturned = await this.http.fetch(`/people/${params.id:this.personsToUpdateId, params.personUpdate: personsUpdate }`);
      //but i think the attribute is clarifying the route

     

        //import { HttpClient, json } from 'aurelia-fetch-client'; this is above what does it do
        //https://aurelia.io/docs/plugins/http-services#aurelia-http-client


        //i dont think i need '/people/ params id because is only one put and there was two get so i think it was needed
        //so right method was selected but if it doesnt work then 'people/ 
        

      
        var data = { personsToUpdateId, personsUpdate }
        ///${params.id}
        
 
        //var UpdatedPersonReturned = await this.http.fetch('/people/${params.id}', {

        //${params.id}
        await this.http.fetch('/people/', {
            method: 'PUT',

            // [HttpPut("{id}")]
           // public IActionResult Update(int id, PersonUpdate personUpdate)
            body: data,
            //body: JSON.stringify(data),
              //probably can reduce the init maybe dont need the headers 
            //headers: { 'Content-Type': 'application/json' }

           

          }).then(function (response) {
            if (!response.ok) {
                //for this to work error need an int does my error send that from the put
                throw new Error('Error ' + response.status);
                //was 'list'
            } else { this.router.navigate('people'); }});

                //one alternate form of dealing with response is using something like this
                //}).then(res => res.json()).then(response => this.router.navigate('list'))
         
           
    

        //this is different from the form used above 
        //const personResponse = await this.http.fetch(`/people/${params.id}`);
       // this.personFetched(await personResponse.json());


        throw new Error('Not Implemented');
  }

  cancel() {
    this.router.navigate('people');
  }
}
