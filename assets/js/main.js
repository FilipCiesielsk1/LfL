// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});



// FONT SWITCHER
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.fs-toggle');
  const menu   = document.querySelector('.fs-menu');

  // pokaż/ukryj menu
  toggle.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  // podmieniaj czcionki
  document.querySelectorAll('.fs-menu li').forEach(item => {
    item.addEventListener('click', () => {
      const menu = document.querySelector('.fs-menu');
      // surowe wartości z HTML, np. "Montserrat, sans-serif"
      const rawSans = item.dataset.sans;
      const rawSerif = item.dataset.serif;

      // funkcja do wrapowania nazw z spacjami w cudzysłowy
      const wrapFamilies = raw => raw
        .split(',')
        .map((fam) => {
          fam = fam.trim();
          // jeśli nazwa zawiera spację, owiń ją w cudzysłowy
          if (fam.includes(' ')) fam = `"${fam}"`;
          return fam;
        })
        .join(', ');

      // ustaw zmienne CSS z poprawnie sformatowanymi rodzinami
      document.documentElement.style.setProperty('--font-sans', wrapFamilies(rawSans));
      document.documentElement.style.setProperty('--font-serif', wrapFamilies(rawSerif));

    });
  });

  // kliknięcie gdziekolwiek poza menu zamyka je
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
});


// LANGUAGE SWITCHER ACTIVE STATE
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang') || 'pl';
  document.querySelectorAll('.lang-switcher a').forEach(a => {
    if (a.getAttribute('href').includes(`lang=${lang}`)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
});

// PHOTO TOGGLE: przełączanie zdjęcia w obie strony
document.addEventListener('DOMContentLoaded', () => {
  const photo     = document.getElementById('profile-photo');
  const toggleBtn = document.getElementById('toggle-photo');

  // dwie ścieżki do plików
  const IMG1 = 'assets/images/monika-portret.jpg';
  const IMG2 = 'assets/images/monika-portret2.jpg';

  toggleBtn.addEventListener('click', () => {
    // Jeżeli src ZAWIERA 'monika-portret.png', przełącz na drugie
    // W przeciwnym razie – wróć na pierwsze.
    if (photo.src.includes('monika-portret.jpg') &&
        !photo.src.includes('monika-portret2.jpg')) {
      photo.src = IMG2;
    } else {
      photo.src = IMG1;
    }
  });
});


// —————————————————————————————————————————
// PAGINACJA z animacją fade-out / fade-in (maks 9 kafelków)
// —————————————————————————————————————————
document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('.publications-section .knowledge-cards');
  const allCards       = Array.from(cardsContainer.querySelectorAll('.knowledge-card'));
  if (allCards.length === 0) return; // jeśli brak kafelków, rezygnujemy

  const cardsPerPage = 10;
  const totalCards   = allCards.length;
  const totalPages   = Math.ceil(totalCards / cardsPerPage);

  const prevBtn  = document.querySelector('.publications-section .prev-btn');
  const nextBtn  = document.querySelector('.publications-section .next-btn');
  const pageInfo = document.querySelector('.publications-section .page-info');

  let currentPage = 1;

  // Funkcja aktualizująca widoczność kafelków
  function updateCardsVisibility(page) {
    const startIdx = (page - 1) * cardsPerPage;
    const endIdx   = Math.min(startIdx + cardsPerPage, totalCards);

    allCards.forEach((card, idx) => {
      card.style.display = (idx >= startIdx && idx < endIdx) ? 'flex' : 'none';
    });
  }

  // Główna funkcja przeładowująca widok z animacją
  function showPageWithFade(page) {
    // 1) Dodajemy klasę "fade-out", by kontener zaczął znikać
    cardsContainer.classList.add('fade-out');
    // Upewniamy się, że usuwamy ewentualną klasę "fade-in"
    cardsContainer.classList.remove('fade-in');

    // 2) Po 400ms (czas trwania transition) przełączamy kafelki
    setTimeout(() => {
      updateCardsVisibility(page);

      // 3) Usuwamy "fade-out", dodajemy "fade-in" → kontener powoli się pojawi
      cardsContainer.classList.remove('fade-out');
      cardsContainer.classList.add('fade-in');

      // 4) Aktualizujemy tekst i stan przycisków
      pageInfo.textContent = `Strona ${page} z ${totalPages}`;
      prevBtn.disabled = (page === 1);
      nextBtn.disabled = (page === totalPages);
    }, 400); // wartość równa czasowi transition w CSS (0.4s)
  }

  // Obsługa kliknięć
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showPageWithFade(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPageWithFade(currentPage);
    }
  });

  // Na start: pobież pierwszą stronę
  updateCardsVisibility(1);
  // Ustawmy od razu informację i stan przycisków
  pageInfo.textContent = `Strona 1 z ${totalPages}`;
  prevBtn.disabled = true;
  nextBtn.disabled = (totalPages <= 1);
});

// —————————————————————————————————————————
// PAGINACJA: Sekcja Dla Biznesu (maks 9 kart na stronę, fade-in/out)
// —————————————————————————————————————————
document.addEventListener('DOMContentLoaded', () => {
  // 1. Pobieramy wszystkie kafelki w business-section
  const businessContainer = document.querySelector('.business-section .business-cards');
  if (!businessContainer) return; // jeśli nie ma sekcji, nic więcej nie robimy

  const allBusinessCards = Array.from(businessContainer.querySelectorAll('.business-card'));
  const cardsPerPageBiz  = 10;
  const totalBizCards    = allBusinessCards.length;
  const totalBizPages    = Math.ceil(totalBizCards / cardsPerPageBiz);

  // 2. Przyciski i page-info
  const prevBizBtn  = document.querySelector('.business-section .prev-btn');
  const nextBizBtn  = document.querySelector('.business-section .next-btn');
  const pageBizInfo = document.querySelector('.business-section .page-info');

  let currentBizPage = 1;

  // 3. Funkcja do aktualizacji widoczności kart
  function updateBusinessVisibility(page) {
    const startIdx = (page - 1) * cardsPerPageBiz;
    const endIdx   = Math.min(startIdx + cardsPerPageBiz, totalBizCards);

    allBusinessCards.forEach((card, idx) => {
      card.style.display = (idx >= startIdx && idx < endIdx) ? 'flex' : 'none';
    });
  }

  // 4. Funkcja, która dodaje animację fade-out/fade-in
  function showBizPageWithFade(page) {
    businessContainer.classList.add('fade-out');
    businessContainer.classList.remove('fade-in');

    setTimeout(() => {
      updateBusinessVisibility(page);

      businessContainer.classList.remove('fade-out');
      businessContainer.classList.add('fade-in');

      pageBizInfo.textContent = `Strona ${page} z ${totalBizPages}`;
      prevBizBtn.disabled = (page === 1);
      nextBizBtn.disabled = (page === totalBizPages);
    }, 400); // taki sam czas jak w CSS transition (0.2s lub 0.3s), tu 400ms
  }

  // 5. Obsługa kliknięć “Poprzednia” / “Następna”
  prevBizBtn.addEventListener('click', () => {
    if (currentBizPage > 1) {
      currentBizPage--;
      showBizPageWithFade(currentBizPage);
    }
  });

  nextBizBtn.addEventListener('click', () => {
    if (currentBizPage < totalBizPages) {
      currentBizPage++;
      showBizPageWithFade(currentBizPage);
    }
  });

  // 6. Na start: pokaż pierwszą stronę bez animacji
  updateBusinessVisibility(1);
  pageBizInfo.textContent = `Strona 1 z ${totalBizPages}`;
  prevBizBtn.disabled = true;
  nextBizBtn.disabled = (totalBizPages <= 1);
});

// —————————————————————————————————————————
// PAGINACJA: Sekcja Dla Pacjentów (maksymalnie 9 kafelków)
// —————————————————————————————————————————
document.addEventListener('DOMContentLoaded', () => {
  // 1. Wybieramy kontener z kartami pacjentów
  const patientsContainer = document.querySelector('.patients-section .patients-cards');
  if (!patientsContainer) return; // jeśli sekcja nie istnieje, nic nie robimy

  const allPatientCards = Array.from(patientsContainer.querySelectorAll('.patients-card'));
  const cardsPerPagePt   = 10;
  const totalPtCards     = allPatientCards.length;
  const totalPtPages     = Math.ceil(totalPtCards / cardsPerPagePt);

  // 2. Przyciski i page-info dla pacjentów
  const prevPtBtn  = document.querySelector('.patients-section .prev-btn');
  const nextPtBtn  = document.querySelector('.patients-section .next-btn');
  const pagePtInfo = document.querySelector('.patients-section .page-info');

  let currentPtPage = 1;

  // 3. Funkcja aktualizująca widoczność kafelków 
  function updatePatientsVisibility(page) {
    const startIdx = (page - 1) * cardsPerPagePt;
    const endIdx   = Math.min(startIdx + cardsPerPagePt, totalPtCards);

    allPatientCards.forEach((card, idx) => {
      card.style.display = (idx >= startIdx && idx < endIdx) ? 'flex' : 'none';
    });
  }

  // 4. Funkcja pokazująca stronę z animacją fade-out/fade-in
  function showPatientsPageWithFade(page) {
    patientsContainer.classList.add('fade-out');
    patientsContainer.classList.remove('fade-in');

    setTimeout(() => {
      updatePatientsVisibility(page);

      patientsContainer.classList.remove('fade-out');
      patientsContainer.classList.add('fade-in');

      pagePtInfo.textContent = `Strona ${page} z ${totalPtPages}`;
      prevPtBtn.disabled = (page === 1);
      nextPtBtn.disabled = (page === totalPtPages);
    }, 400); // 400ms → powinno odpowiadać transition w CSS
  }

  // 5. Obsługa kliknięć “Poprzednia” / “Następna”
  prevPtBtn.addEventListener('click', () => {
    if (currentPtPage > 1) {
      currentPtPage--;
      showPatientsPageWithFade(currentPtPage);
    }
  });

  nextPtBtn.addEventListener('click', () => {
    if (currentPtPage < totalPtPages) {
      currentPtPage++;
      showPatientsPageWithFade(currentPtPage);
    }
  });

  // 6. Na start: pokazujemy stronę 1 bez animacji
  updatePatientsVisibility(1);
  pagePtInfo.textContent = `Strona 1 z ${totalPtPages}`;
  prevPtBtn.disabled = true;
  nextPtBtn.disabled = (totalPtPages <= 1);
});
