const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2602-FTB-CT-WEB-PT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let events = [];
let selectedEvent;

async function getEvents() {
    try {
        const response = await fetch(API);
        const result = await response.json();
        events = result.data;
        render();
    } catch (error) {
        console.error(error);
    }
}

async function getEvent(id) {
    try {
        const response = await fetch(API + "/" + id);
        const result = await response.json();
        selectedEvent = result.data;
        render();
    } catch (error) {
        console.error(error);
    }
}

async function getGuests() {

}

const EventListItem = (event) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
        <a href="#selected">${event.name}</a>
    `;
    $li.addEventListener("click", () => getEvent(event.id));
    return $li;
}

const EventList = () => {
    const $ul = document.createElement("ul");
    $ul.classList.add("lineup");

    const $events = events.map(EventListItem);
    $ul.replaceChildren(...$events);

    return $ul;
}

const EventDetails = () => {
    if(!selectedEvent) {
        const $p = document.createElement("p");
        $p.textContent = "Please select an event to learn more.";
        return $p;
    }
    const $event = document.createElement("section");
    $event.classList.add("artist");
    $event.innerHTML = `
        <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
        <div>
            <p>${selectedEvent.date}</p>
            <p>${selectedEvent.location}</p>
        </div>
        <p>${selectedEvent.description}</p>
    `;
    return $event;
}

const render = () => {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
        <h1>Fullstack Events</h1>
        <main>
        <section>
            <h2>Upcoming Parties</h2>
            <EventList></EventList>
        </section>
        <section id="selected">
            <h2>Party Details</h2>
            <EventDetails></EventDetails>
        </section>
        </main>
    `;
    $app.querySelector("EventList").replaceWith(EventList());
    $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();