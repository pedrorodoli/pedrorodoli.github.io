document.addEventListener('DOMContentLoaded', function() {
    const hamburgerCheckbox = document.querySelector('.hamburger .checkbox');
    const navLinks = document.querySelector('.nav-links');
    const divTitulo = document.querySelector('.logo');
    const titulo = document.querySelector('.logo-text');
    const carousels = document.querySelectorAll('.carousel');

    // Alternar visibilidad del menú de navegación en función del estado del checkbox
    if (hamburgerCheckbox && navLinks) {
        hamburgerCheckbox.addEventListener('change', function() {
            navLinks.classList.toggle('active', hamburgerCheckbox.checked);
        });
    }

    // Asegura que el menú esté visible en pantallas grandes al cargar
    const handleResize = () => {
        if (window.innerWidth > 768) {
            navLinks.classList.add('active'); // Muestra el menú en pantallas grandes
            if (hamburgerCheckbox) hamburgerCheckbox.checked = false; // Deseleccionar checkbox
        } else if (hamburgerCheckbox && !hamburgerCheckbox.checked) {
            navLinks.classList.remove('active'); // Oculta el menú en pantallas pequeñas si el checkbox no está seleccionado
        }
    };

    // Escucha cambios de tamaño de pantalla y ejecuta la función una vez al cargar
    window.addEventListener('resize', handleResize);
    handleResize();

    // Configura visibilidad de los elementos del título y logo
    if (divTitulo) divTitulo.style.display = 'flex';
    if (titulo) titulo.style.display = 'flex';

    // Configuración de carruseles
    carousels.forEach((carousel) => {
        let currentSlide = 0;
        const slides = carousel.querySelectorAll('.carousel-images img');
        const imagesContainer = carousel.querySelector('.carousel-images');
        const totalSlides = slides.length;
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');

        const showSlide = (index) => {
            currentSlide = (index + totalSlides) % totalSlides;
            const offset = -currentSlide * 100;
            imagesContainer.style.transform = `translateX(${offset}%)`;
        };

        // Cambio automático de diapositivas
        let autoSlideInterval = setInterval(() => showSlide(currentSlide + 1), 3000);
        const stopAutoSlide = () => clearInterval(autoSlideInterval);

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(currentSlide - 1);
            });

            nextButton.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(currentSlide + 1);
            });
        }

        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        });

        carousel.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        });

        const handleGesture = () => {
            if (touchEndX < touchStartX) showSlide(currentSlide + 1);
            if (touchEndX > touchStartX) showSlide(currentSlide - 1);
        };

        showSlide(currentSlide);
    });
});
