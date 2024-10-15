function filterContacts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const contactCards = document.querySelectorAll('.card');
    
    contactCards.forEach(card => {
        const name = card.querySelector('.card-details strong').textContent.toLowerCase();
        if (name.includes(searchInput)) {
            card.style.display = ''; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
}

function scrollToContact(letter) {
    const contact = document.getElementById(letter);
    if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
    }
}
