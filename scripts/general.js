// contact form

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if(response.ok) {
      formMessage.textContent = "Thank you! Your enquiry has been sent.";
      form.reset();
    } else {
      formMessage.textContent = "Oops! There was a problem submitting your form.";
    }
  });
});

// Link share
function shareDish() {
  if (navigator.share) {
    navigator.share({
      title: 'Shri Kuberan Tiffen Home',
      text: 'Fresh Idly, Dosa & Batter available. Order now!',
      url: window.location.href
    });
  } else {
    alert('Sharing not supported. Copy the link manually.');
  }
}

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    renderSection(data.Breakfast, "breakfastRow");
    renderSection(data.Rice_Biryani, "riceRow");
    renderSection(data.Ready_to_eat, "readyRow");
  })
  .catch(err => console.error(err));


function renderSection(items, containerId) {
  const container = document.getElementById(containerId);

  items.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.setAttribute("data-aos", "fade-up");
    col.setAttribute("data-aos-duration", "1000");

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body text-center">
          <h5>${item.Title}</h5>
          <img src="${item.image}" alt="${item.Title}"
               class="img-fluid pt-2 pb-2 food">
          <p class="small fw-semibold">${item.desc}</p>
          <p class="fw-semibold">${item.price}/-</p>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}
