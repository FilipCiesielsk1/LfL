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

