using System;
using Microsoft.AspNetCore.Mvc;
using TechTest.Repositories;
using TechTest.Repositories.Models;

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

            //HttpHet attribute stops/changes default routing?
            //route is api/people

            //should i use system.runtime.serialization.Json
            //using System.Web.Script.Serialization;
            //string output = new JavaScriptSerializer().Serialize(ListOfMyObject);
            //should i be using "OK result"


            List<Person> allPeopleFound = PersonRepository.GetAll();
            if (allPeopleFound.Count == 0) {
                var JSONEmpty = { };
                return JSONEmpty; }
            else {
                //returns enumerals collections

                return allPeopleFound; }
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

            //running search twice and do i need protections against id key
            //isnt unique due to an input error - nope that should happen where it is got from

            if (PersonRepository.Get(id) != null)
            {
                personFound = PersonRepository.Get(id);
                return personFound;
            }
            else
            {
                //not sure how this works
                return NotFoundResult();
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



            //it takes in a person spits out a person
            //it uses an id from the person
            //personUpdate doesnt provide a person so must have to find it with id

            //put into a line later
            //may change if i have to change previous step return type


            //when i use this in step 7 i will be receiving a javaobject which is
            //the same pretty similar to json
            //so will need to convert it
            //also i think when it asks for the api i think it means the api httpput

          
            personUpdate = Newtonsoft.Json.JsonConvert.DeserializeObject<PersonUpdate>(personUpdate);
            //if receive as var may need to cast id (or assumed by method)
            var personToUpdate = Get(id);
            if (personToUpdate = NotFoundResult) { return NotFoundResult(); }
            else
            {
                //wrong

                Person personWithUpdates = new Person
                {
                    id = person.id,
                    FirstName = person.FirstName,
                    LastName = person.LastName,
                    Authorised = personUpdate.Authorised,
                    Enabled = personUpdate.Enabled,
                    Colours = personUpdate.Colours
                };
               
                return PersonRepository.Update(person);
            }

            throw new NotImplementedException();
        }
    }
}