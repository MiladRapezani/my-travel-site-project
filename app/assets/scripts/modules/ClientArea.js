import Axios from 'axios';
import { reject } from 'lodash';

class ClientArea {
    constructor() {
        this.insertHTML()
        this.form = document.querySelector('.client-area__form');
        this.field = document.querySelector('.client-area__input');
        this.clientAreaContent = document.querySelector('.client-area__content');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => { 
            e.preventDefault();
            this.sendRequest();
        })
    }

    sendRequest() {
        const url = 'https://my-travel-site-project.netlify.app/.netlify/functions/secret-area';

        Axios.post(url, { 'password': this.field.value })
             .then(response => {
                 this.field.remove();
                 this.clientAreaContent.innerHTML = response.data;
             })
             .catch(() => {
                 this.clientAreaContent.innerHTML = `<p class="client-area__error">عبارت مخفی صحیح نیست، می تونید مجدد امتحان کنید.</p>`;
                 this.field.value = '';
                 this.field.focus();
             })
    }

    insertHTML() {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="client-area page-section">
            <div class="wrapper wrapper--medium">
            <h2 class="section-heading section-heading--primary">
                <span class="section-heading__title">ناحیه مخفی ِ کاربر</span>
            </h2>

            <form class="client-area__form" action="">
                <input type="text" class="client-area__input" placeholder="کلمه مخفی را وارد کنید.">
                <button class="btn btn--secondary">ارسال</button>
            </form>
            <div class="client-area__content"></div>
            </div>
        </div>
        `)
    }
}

export default ClientArea;