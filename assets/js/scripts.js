(function($) {

    var $window = $(window),
        $body = $('body');

    // Ensure breakpoints is defined
    if (typeof breakpoints !== 'undefined') {
        breakpoints({
            xlarge:   [ '1281px',  '1680px' ],
            large:    [ '981px',   '1280px' ],
            medium:   [ '737px',   '980px'  ],
            small:    [ '481px',   '736px'  ],
            xsmall:   [ '361px',   '480px'  ],
            xxsmall:  [ null,      '360px'  ]
        });
    }

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Touch?
    if (typeof browser !== 'undefined' && browser.mobile)
        $body.addClass('is-touch');

    // Forms.
    var $form = $('form');

    // Auto-resizing textareas.
    $form.find('textarea').each(function() {

        var $this = $(this),
            $wrapper = $('<div class="textarea-wrapper"></div>');

        $this
            .wrap($wrapper)
            .attr('rows', 1)
            .css('overflow', 'hidden')
            .css('resize', 'none')
            .on('keydown', function(event) {
                if (event.keyCode == 13 && event.ctrlKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).blur();
                }
            })
            .on('blur focus', function() {
                $this.val($.trim($this.val()));
            })
            .on('input blur focus --init', function() {
                $wrapper.css('height', $this.height());
                $this.css('height', 'auto').css('height', $this.prop('scrollHeight') + 'px');
            })
            .on('keyup', function(event) {
                if (event.keyCode == 9)
                    $this.select();
            })
            .triggerHandler('--init');

        // Fix.
        if (typeof browser !== 'undefined' && (browser.name == 'ie' || browser.mobile))
            $this.css('max-height', '10em').css('overflow-y', 'auto');
    });

    // Nav.
    const navIcon = document.querySelector(".nav-icon");
    const nav = document.querySelector("nav");

    navIcon.onclick = function () {
        nav.classList.toggle('show');
    }

    // Menu.
    var $menu = $('#menu');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function() {
        if ($menu._locked)
            return false;

        $menu._locked = true;

        window.setTimeout(function() {
            $menu._locked = false;
        }, 350);

        return true;
    };

    $menu._show = function() {
        if ($menu._lock())
            $body.addClass('is-menu-visible');
    };

    $menu._hide = function() {
        if ($menu._lock())
            $body.removeClass('is-menu-visible');
    };

    $menu._toggle = function() {
        if ($menu._lock())
            $body.toggleClass('is-menu-visible');
    };

    $menu
        .appendTo($body)
        .on('click', function(event) {
            event.stopPropagation();
        })
        .on('click', 'a', function(event) {

            var href = $(this).attr('href');

            event.preventDefault();
            event.stopPropagation();

            // Hide.
            $menu._hide();

            // Redirect.
            if (href == '#menu')
                return;

            window.setTimeout(function() {
                window.location.href = href;
            }, 350);

        })
        .append('<a class="close" href="#menu">Close</a>');

    $body
        .on('click', 'a[href="#menu"]', function(event) {
            event.stopPropagation();
            event.preventDefault();
            $menu._toggle();
        })
        .on('click', function(event) {
            $menu._hide();
        })
        .on('keydown', function(event) {
            if (event.keyCode == 27)
                $menu._hide();
        });

    // Back to Top button
    var backToTopButton = document.getElementById("myBtn");

    // Show the button when scrolling down 20px
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    // Scroll to the top when the button is clicked
    backToTopButton.onclick = function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

})(jQuery);

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'block';
    lightboxImg.src = galleryItems[index].src;
    caption.innerHTML = galleryItems[index].alt;
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    caption.innerHTML = galleryItems[currentIndex].alt;
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    caption.innerHTML = galleryItems[currentIndex].alt;
});

window.addEventListener('click', (event) => {
    if (event.target == lightbox) {
        lightbox.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const tiles = document.querySelectorAll(".tile");
    const modalContent = document.querySelector(".modal__content");

    tiles.forEach(tile => {
        tile.querySelector('.open-modal').addEventListener('click', function() {
            const title = tile.getAttribute('data-title');
            const description = tile.getAttribute('data-description');
            const images = tile.getAttribute('data-images').split(',');

            // Clear previous content
            modalContent.innerHTML = '';

            // Add new content
            const titleElement = document.createElement('h1');
            titleElement.textContent = title;
            modalContent.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description;
            modalContent.appendChild(descriptionElement);

            const galleryElement = document.createElement('div');
            galleryElement.classList.add('gallery');
            images.forEach(src => {
                const imgElement = document.createElement('img');
                imgElement.src = src;
                imgElement.classList.add('gallery-item');
                galleryElement.appendChild(imgElement);
            });
            modalContent.appendChild(galleryElement);
        });
    });
});
