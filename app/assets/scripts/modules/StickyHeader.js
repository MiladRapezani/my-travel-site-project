import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector('.site-header');
        this.pageSections = document.querySelectorAll('.large-hero, .page-section');
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.events();
    }

    events() {
        window.addEventListener('scroll', throttle(() => this.runOnScroll(), 200));
        window.addEventListener('resize', debounce(() => {
                this.browserHeight = window.innerHeight;
            }, 333)
        );
    }

    runOnScroll() {
        this.determineScrollDirection();

        if(window.scrollY > 90) {
            this.siteHeader.classList.add('site-header--dark');
        } else {
            this.siteHeader.classList.remove('site-header--dark');
        }

        this.pageSections.forEach(el => this.calcSection(el));
    }

    determineScrollDirection() {
        if(window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down';
        } else {
            this.scrollDirection = 'up';
        }
        this.previousScrollY = window.scrollY;
    }

    calcSection(el) {
        if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100;

            if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection === 'down' 
                || scrollPercent < 33 && this.scrollDirection === 'up') {
                    console.log(el.getAttribute('data-matching-link'));
                let matchingLink = el.getAttribute('data-matching-link');
                document.querySelectorAll('.primary-nav__link').forEach(el => el.classList.remove('primary-nav__link--is-current'));

                if(matchingLink) document.querySelector(matchingLink).classList.add('primary-nav__link--is-current');
                // if matchingLink === undefined mean scroll are in .large-hero, so we dont need to add --is-current
            }
        }
    }
}

export default StickyHeader;