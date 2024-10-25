class Corsi {
    constructor(name, description, shortDescription, duration, price, id, img) {
      this.name = name;
      this.description = description;
      this.shortDescription = shortDescription;
      this.duration = duration;
      this.price = price;
      this.id = id;
      this.img = img;
    }
  }

  const carouselContainer = document.getElementById('carousel');
  
  // Funzione per popolare il carosello
  function createCarouselItems(corsi) {
    const carousel = document.createElement('div');
    carousel.setAttribute('id', 'carouselExampleIndicators');
    carousel.classList.add('carousel', 'slide');
    carousel.setAttribute('data-ride', 'carousel');
  
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
  
    const inner = document.createElement('div');
    inner.classList.add('carousel-inner');
  
    corsi.forEach((corso, index) => {
      // Creazione dell'indicatore
      const indicator = document.createElement('li');
      indicator.setAttribute('data-target', '#carouselExampleIndicators');
      indicator.setAttribute('data-slide-to', index.toString());
      if (index === 0) indicator.classList.add('active');
      indicators.appendChild(indicator);
  
      // Creazione dell'item del carosello
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      if (index === 0) item.classList.add('active');
  
      const img = document.createElement('img');
      img.classList.add('d-block', 'w-100');
      img.setAttribute('src', corso.img);
      img.setAttribute('alt', corso.name);
      item.appendChild(img);
  
      // Aggiungi il nome del corso e la breve descrizione
      const caption = document.createElement('div');
      caption.classList.add('carousel-caption');
      const courseTitle = document.createElement('h5');
      courseTitle.textContent = corso.name;
      const courseDesc = document.createElement('p');
      courseDesc.textContent = corso.shortDescription;
      caption.appendChild(courseTitle);
      caption.appendChild(courseDesc);
  
      item.appendChild(caption);
      inner.appendChild(item);
    });
  
    carousel.appendChild(indicators);
    carousel.appendChild(inner);
  
    // Controllo precedente
    const prevControl = document.createElement('a');
    prevControl.classList.add('carousel-control-prev');
    prevControl.setAttribute('href', '#carouselExampleIndicators');
    prevControl.setAttribute('role', 'button');
    prevControl.setAttribute('data-slide', 'prev');
  
    const prevIcon = document.createElement('span');
    prevIcon.classList.add('carousel-control-prev-icon');
    prevIcon.setAttribute('aria-hidden', 'true');
    prevControl.appendChild(prevIcon);
  
    const prevText = document.createElement('span');
    prevText.classList.add('sr-only');
    prevText.textContent = 'Previous';
    prevControl.appendChild(prevText);
  
    carousel.appendChild(prevControl);
  
    // Controllo successivo
    const nextControl = document.createElement('a');
    nextControl.classList.add('carousel-control-next');
    nextControl.setAttribute('href', '#carouselExampleIndicators');
    nextControl.setAttribute('role', 'button');
    nextControl.setAttribute('data-slide', 'next');
  
    const nextIcon = document.createElement('span');
    nextIcon.classList.add('carousel-control-next-icon');
    nextIcon.setAttribute('aria-hidden', 'true');
    nextControl.appendChild(nextIcon);
  
    const nextText = document.createElement('span');
    nextText.classList.add('sr-only');
    nextText.textContent = 'Next';
    nextControl.appendChild(nextText);
  
    carousel.appendChild(nextControl);
  
    // Aggiungiamo il carosello al body
    document.body.appendChild(carousel);
  }
  
  // Funzione per fare il fetch dei dati
  function fetchData() {
    fetch('http://localhost:3000/corsi')
      .then(response => response.json())
      .then(data => {
        // Creiamo gli oggetti dei corsi a partire dai dati ricevuti
        const corsi = data.map(corso => new Corsi(
          corso.name,
          corso.description,
          corso.shortDescription,
          corso.duration,
          corso.price,
          corso.id,
          corso.img
        ));
  
        // Popoliamo il carosello con i corsi
        createCarouselItems(corsi);
      })
      .catch(error => console.error('Errore nel fetch dei corsi:', error));
  }
  
  // Richiama la funzione per fare il fetch dei dati
  fetchData();
  
  carouselContainer.appendChild(carousel);
