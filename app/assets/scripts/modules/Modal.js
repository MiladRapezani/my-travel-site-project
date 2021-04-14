
class Modal {
    constructor() {
        this.injectHtml();
        this.modalElement = document.querySelector('.modal');
        this.modalOpenButtons = document.querySelectorAll('.js-open-modal');
        this.modalInnerElement = document.querySelector('.modal__inner');
        // this.modalCloseButtons = document.querySelectorAll('.modal, .modal__close');
        this.events();
    }

    events() {
        this.modalOpenButtons.forEach(btn => btn.addEventListener('click', (e) => this.openTheModal(e)));
        
        this.modalElement.addEventListener('click', () => this.closeTheModal());
        this.modalInnerElement.addEventListener('click', e => e.stopPropagation());

        document.addEventListener('keyup', e => { if(e.key === 'Escape' || e.key === 'Esc') this.closeTheModal(); });
    }
    
    openTheModal(e) {
        e.preventDefault();     // we force href dont not work
        this.modalElement.classList.add('modal--is-visible');
    }
    
    closeTheModal() {
        this.modalElement.classList.remove('modal--is-visible');
    }

    injectHtml() {
        let elementModal = /*html*/
                `<div class="modal">
                    <div class="modal__close">X</div>
                    <div class="modal__inner">
                        <h2 class="section-heading section-heading--primary section-heading--mb-small">
                            <img class="section-heading__icon" src="assets/images/icons/mail.svg">
                            <span class="section-heading__title">با ما <strong>تماس بگیرید</strong></span>
                        </h2>
                        
                        <div class="wrapper wrapper--narrow">
                            <p class="modal__description">به زودی با سیستم پاسخگویی آنلاین در دسترس تان خواهیم بود. تا آن زمان، با هر یک از برنامه های زیر، با ما در ارتباط باشید!</p>
                        </div>
                    
                        <div class="social-icons">
                            <a href="#" class="social-icons__icon">
                            <img src="assets/images/icons/facebook.svg" alt="Facebook">
                            </a>
                            <a href="#" class="social-icons__icon">
                            <img src="assets/images/icons/twitter.svg" alt="Twitter">
                            </a>
                            <a href="#" class="social-icons__icon">
                            <img src="assets/images/icons/instagram.svg" alt="Instagram">
                            </a>
                            <a href="#" class="social-icons__icon">
                            <img src="assets/images/icons/youtube.svg" alt="YouTube">
                            </a>
                        </div>
                    </div>
                </div>`;
        document.body.insertAdjacentHTML('beforeend', elementModal);
    }
}

export default Modal;