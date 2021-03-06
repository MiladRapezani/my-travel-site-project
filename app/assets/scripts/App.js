import '../styles/styles.css';
import 'lazysizes'
import MobileMenu from './modules/MobileMenu.js';
import RevealOnScroll from './modules/RevealOnScroll.js';
import StickyHeader from './modules/StickyHeader.js';
// import Modal from './modules/Modal.js';
import ClientArea from './modules/ClientArea.js';

new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonial-item'), 60);
new MobileMenu();
new StickyHeader();
new ClientArea();
let modal;

document.querySelectorAll('.js-open-modal').forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();     // we force href dont not work

    if(typeof modal === 'undefined') {
        import(/* webpackChunkName: "modal" */ './modules/Modal')
        .then(x => {
            modal = new x.default();
            setTimeout(() => modal.openTheModal(), 20)  // first time, for animation 20 milliseconds delay
        })
        .catch(() => console.log('Problem for import file'))
    } else {
        modal.openTheModal();
    }
}));

// React Related Codes goes here
import React from 'react'
import ReactDOM from 'react-dom'

// Import React Components that we created
import MyAmazingComponent from './modules/MyAmazingComponent.js'

ReactDOM.render(<MyAmazingComponent />, document.querySelector('#my-react-example'));