using System;
using Microsoft.AspNetCore.Mvc;
using TechTest.Repositories;
using TechTest.Repositories.Models;

using System.Collections.Generic; //I added
using Newtonsoft.Json; //I added
using Newtonsoft.Json.Linq;//I added
using System.Linq; //I added
using System.Diagnostics;

namespace TechTest.Controllers
{
    [Route("api/people")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        public PeopleController(IPersonRepository personRepository)
        {
            this.PersonRepository = personRepository;
        }

        private IPersonRepository PersonRepository { get; }

        [HttpGet]
        public IActionResult GetAll()
        {
            // TODO: Step 1
            //
            // Implement a JSON endpoint that returns the full list
            // of people from the PeopleRepository. If there are zero
            // people returned from PeopleRepository then an empty
            // JSON array should be returned.



            //should i use system.runtime.serialization.Json
            //using System.Web.Script.Serialization;
            //string output = new JavaScriptSerializer().Serialize(ListOfMyObject);



            //added to top of code
            // using.systems.collections.generic;
            //its ienumeral example asks for list so I am 
            //List<Person> allPeopleFound =  (List<Person>) PersonRepository.GetAll();

            //using var so dont have to do anything with it
            var allPeopleFound = PersonRepository.GetAll();
            if (allPeopleFound == null || !allPeopleFound.Any()) {

                //empty json array
                JArray JSONEmpty = new JArray();
                return Ok(JSONEmpty); }
            else {
                //returns enumerals collections

              
                return Ok(allPeopleFound); }
            throw new NotImplementedException();
        }
        

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // TODO: Step 2
            //
            // Implement a JSON endpoint that returns a single person
            // from the PeopleRepository based on the id parameter.
            // If null is returned from the PeopleRepository with
            // the supplied id then a NotFound should be returned.


            if (PersonRepository.Get(id) != null)
            {
                Person personFound = PersonRepository.Get(id);


                return Ok(personFound);
            }
            else
            {
                //check http code
                return NotFound();
            }

            throw new NotImplementedException();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PersonUpdate personUpdate)
        {
            // TODO: Step 3
            //
            // Implement an endpoint that receives a JSON object to
            // update a person
            //using the PeopleRepository based on
            // the id parameter. Once the person has been successfully
            // updated, the 
            //person should be returned 
            //from the endpoint.
            // If null is returned from the PeopleRepository then a
            // NotFound should be returned.

            //dont understand the method is not written to receive a json object but instead an int and personUpdate
            //do i need to be turning the data i send into id and person update?
            

          
           // personUpdate = Newtonsoft.Json.JsonConvert.DeserializeObject<PersonUpdate>(personUpdate);
            
            

            var personToUpdate = PersonRepository.Get(id);
           
              
                {
                    Person personWithUpdates = new Person
                    {
                        Id = id,
                        FirstName = personToUpdate.FirstName,
                        LastName = personToUpdate.LastName,
                        Authorised = personUpdate.Authorised,
                        Enabled = personUpdate.Enabled,
                        Colours = personUpdate.Colours
                    };
                Person callbackFromUpdate = PersonRepository.Update(personWithUpdates);
                if (callbackFromUpdate==null) { return NotFound(); } else { return Ok(callbackFromUpdate);} ;


            }

            throw new NotImplementedException();
        }
    }
}