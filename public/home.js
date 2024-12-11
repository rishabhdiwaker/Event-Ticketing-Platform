let menuList = document.getElementById("links");
menuList.style.maxHeight = "0px";

function toggleMenu() {
  if (menuList.style.maxHeight == "0px") {
    menuList.style.maxHeight = "300px";
    menuList.style.backgroundColor = "green";
  } else {
    menuList.style.maxHeight = "0px";
  }
}

function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
const username = JSON.parse(localStorage.getItem("username"));

const eventCardParent = document.getElementById("cards-hori");
const eventCards = eventCardParent.children;

(async () => {
  try {
    const response = await fetch("http://127.0.0.1:9600/events/get-events");
    eventData = await response.json();

    for (let i = 0; i < eventData.length; i++) {
      const event = eventData[i];
      const card = eventCards[i];

      const eventDate = formatDate(event.event_date);
      const eventLocation = event.location;
      const eventPrice = event.price;
      const eventName = event.event_name;

      card.querySelector(".event-date").innerText = `Date: ${eventDate}`;
      card.querySelector(
        ".event-location"
      ).innerText = `Location: ${eventLocation}`;
      card.querySelector(".event-price").innerText = `Price: Rs. ${eventPrice}`;
      const eventAttribute = card.querySelector(
        ".book-tkt.bookTicketButton input"
      );
      eventAttribute.setAttribute("data-event-name", eventName);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();

function redirectToBookingPage(button) {
  const eventName = button.getAttribute("data-event-name");

  const bookingUrl = `/events?eventName=${encodeURIComponent(eventName)}`;

  window.location.href = bookingUrl;
}
