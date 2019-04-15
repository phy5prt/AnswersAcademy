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

            

            //should i use system.runtime.serialization.Json
            //using System.Web.Script.Serialization;
            //string output = new JavaScriptSerializer().Serialize(ListOfMyObject);

            


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


            if (PersonRepository.Get(id) != null)
            {
                personFound = PersonRepository.Get(id);


                return personFound;
            }
            else
            {
                //check http code
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

            //dont understand the method is not written to receive a json object but instead an int and personUpdate
            //do i need to be turning the data i send into id and person update?
            

          
            personUpdate = Newtonsoft.Json.JsonConvert.DeserializeObject<PersonUpdate>(personUpdate);
            //if receive as var may need to cast id (or assumed by method)
            var personToUpdate = Get(id);
            if (personToUpdate = NotFoundResult) {
                //check the httpcodes
                return NotFoundResult(); }
            else
            {
                //try catch may not be necessary and may mess with the async?
                try
                {
                    Person personWithUpdates = new Person
                    {
                        id = id,
                        FirstName = person.FirstName,
                        LastName = person.LastName,
                        Authorised = personUpdate.Authorised,
                        Enabled = personUpdate.Enabled,
                        Colours = personUpdate.Colours
                    };

                    PersonRepository.Update(person);


                    //check the http codes
                    return OkObjectResult();
                }
                //check the http codes
                catch { return NotFoundResult(); }
            }

            throw new NotImplementedException();
        }
    }
}