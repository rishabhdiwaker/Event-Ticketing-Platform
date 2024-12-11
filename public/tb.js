function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    eventName: params.get("eventName"),
    eventDate: params.get("eventDate"),
    eventPrice: params.get("eventPrice"),
    eventVenue: params.get("eventVenue"),
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const { eventName, eventDate, eventPrice, eventVenue } = getQueryParams();
  // API call for show particular event data
  (async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:9600/events/get-event/${eventName}`
      );
      let showEventData = await response.json();
      console.log(showEventData[0]);

      const defaultEventData = {
        title: showEventData[0].event_name || "Default Event",
        date: formatDate(showEventData[0].event_date) || "2024-12-05",
        time: "8:00 PM",
        venue: showEventData[0].location || "JLN Stadium",
        pricePerSeat: showEventData[0].price,
        totalTickets: showEventData[0].total_tickets,
        soldTickets: showEventData[0].booked_tickets || 0,
        eventid: showEventData[0].id,
      };

      document.getElementById("event-name").textContent = defaultEventData.title;
      document.getElementById("event-date-time").textContent = `Date: ${defaultEventData.date} | Time: ${defaultEventData.time} | Venue: ${defaultEventData.venue}`;
      document.getElementById("total-tickets").textContent = defaultEventData.totalTickets;
      document.getElementById("tickets-sold").textContent = defaultEventData.soldTickets;
      document.getElementById("tickets-available").textContent = defaultEventData.totalTickets - defaultEventData.soldTickets;
      document.getElementById("tickets-prize").textContent = defaultEventData.pricePerSeat;

      const seatGrid = document.getElementById("seat-grid");
      let booked_ticket = defaultEventData.soldTickets;

      for (let i = 1; i <= defaultEventData.totalTickets; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = i;

        if (booked_ticket > 0) {
          seat.classList.add("filled-seat");
          seat.style.cursor = "pointer";
          seat.addEventListener("click", () => confirmCancelSeat(defaultEventData.eventid));
        } else {
          seat.classList.add("vacant-seat");
          seat.addEventListener("click", () => toggleSeat(defaultEventData.eventid));
        }

        seatGrid.appendChild(seat);
        booked_ticket--;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })();

  function toggleSeat(eventId) {
    if (confirm("Book ticket")) {
      fetch('http://127.0.0.1:9600/events/update-event', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: eventId
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("Failed to update resource");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Update successful", data);
          location.reload();
          alert("Seat booked successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function confirmCancelSeat(eventId) {
    if (confirm("Do you want to delete this ticket?")) {
      fetch(`http://127.0.0.1:9600/events/delete-event-seat`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: eventId
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("Failed to update resource");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Update successful", data);
          location.reload();
          alert("Seat deleted successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
});
