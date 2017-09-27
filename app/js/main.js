var navToggler = $('.nav__toggler'),
    slideDownBtn = $('.slide-down-button');

function toggleNav() {
    $('.mobile-nav').toggleClass('mobile-nav--open');
    $(this).toggleClass('nav__toggler--open');
}

function startCarousel() {
        var slides = $('.carousel__item'),
            buttons = $('.controls__button'),
            slidesNumber = slides.length,
            currentSlide = Math.floor(Math.random() * slidesNumber),
            timer;

        showSlide();

        function hideSlide() {

            $(slides[currentSlide]).fadeOut();
            $(buttons[currentSlide]).removeClass('controls__button--active');

            currentSlide += 1;

            setTimeout(showSlide, 1000);

        }

        function showSlide() {

            if (currentSlide >= slidesNumber) {
                currentSlide = 0;
            }
            $(slides[currentSlide]).fadeIn();
            $(buttons[currentSlide]).addClass('controls__button--active');
            timer = setTimeout(hideSlide, 3500);

        }

        buttons.on('click', function() {

            clearTimeout(timer);

            $(slides[currentSlide]).fadeOut();
            $(buttons[currentSlide]).removeClass('controls__button--active');
            currentSlide = $(this).index();
            showSlide();
        });

    }

startCarousel();

navToggler.on('click', toggleNav);

slideDownBtn.on('click', function(e) {
    e.preventDefault();
	var href = $(this).attr('href');
	$('html, body').animate({
		scrollTop: $(href).offset().top + 'px'
	}, 1500);
});

// Scroll Reveal
window.sr = ScrollReveal();

sr.reveal('.about__content--left', {
    origin: 'left',
    distance: '50%',
    duration: '700',
    delay: '100'
});

sr.reveal('.about__content--right', {
    origin: 'right',
    distance: '50%',
    duration: '700',
    delay: '100'
});

sr.reveal('.gallery__item', {
    delay: '200'
}, 100);

sr.reveal('.col--left .feature', {
    origin: 'left',
    distance: '200px',
    delay: '200',
    mobile: false
}, 600);

sr.reveal('.col--right .feature', {
    origin: 'right',
    distance: '200px',
    mobile: false
}, 600);

sr.reveal('.features-list__item', {
    origin: 'left',
    delay: 200
}, 100);

sr.reveal('.posts .post', {
    delay: '100',
    mobile: false
}, 200);
