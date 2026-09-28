const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

const bookingForm =
  document.getElementById("bookingForm");

const successMessage =
  document.getElementById("successMessage");

const errorMessage =
  document.getElementById("errorMessage");


// ==========================================
// AVAILABLE TIMES
// ==========================================

const availableTimes = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM"
];


// ==========================================
// 24-HOUR NOTICE
// ==========================================

const tomorrow = new Date(
  Date.now() + 24 * 60 * 60 * 1000
);

const minimumDate =
  tomorrow.getFullYear() +
  "-" +
  String(tomorrow.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(tomorrow.getDate()).padStart(2, "0");

dateInput.min = minimumDate;


// ==========================================
// DATE SELECTION
// ==========================================

dateInput.addEventListener(
  "change",
  function () {

    timeInput.innerHTML = "";

    if (!dateInput.value) {

      timeInput.disabled = true;

      timeInput.innerHTML =
        '<option value="">Choose a date first</option>';

      return;
    }

    timeInput.disabled = false;

    const firstOption =
      document.createElement("option");

    firstOption.value = "";

    firstOption.textContent =
      "Select a time";

    timeInput.appendChild(firstOption);


    availableTimes.forEach(function(time) {

      const option =
        document.createElement("option");

      option.value = time;

      option.textContent = time;

      timeInput.appendChild(option);

    });

  }
);


// ==========================================
// BOOKING
// ==========================================

bookingForm.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();

    successMessage.style.display = "none";
    errorMessage.style.display = "none";


    // Formspree endpoint
    // Replace this later with your real endpoint.

    const formEndpoint =
      "YOUR_FORMSPREE_ENDPOINT_HERE";


    if (
      formEndpoint ===
      "YOUR_FORMSPREE_ENDPOINT_HERE"
    ) {

      successMessage.innerHTML = `

        <h3>
          Booking Request Created! 💅🏽
        </h3>

        <p>
          Sahara's booking has been recorded.
        </p>

        <p>
          Connect the email notification
          service to receive the booking.
        </p>

      `;

      successMessage.style.display = "block";

      return;
    }


    const formData =
      new FormData(bookingForm);


    try {

      const response =
        await fetch(
          formEndpoint,
          {
            method: "POST",
            body: formData,
            headers: {
              "Accept":
                "application/json"
            }
          }
        );


      if (response.ok) {

        bookingForm.reset();

        timeInput.disabled = true;

        timeInput.innerHTML =
          '<option value="">Choose a date first</option>';

        successMessage.style.display =
          "block";

      } else {

        throw new Error(
          "Booking failed"
        );

      }

    } catch (error) {

      errorMessage.textContent =
        "Something went wrong. Please try again.";

      errorMessage.style.display =
        "block";

    }

  }
);
