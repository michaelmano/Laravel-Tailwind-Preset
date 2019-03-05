import axios from 'axios';
import Vue from 'vue';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Now lets require all .vue files and make them globally available
 * to the application. via `<vue-file-name></vue-file-name>`
 * and set up the main application
 */

const VueComponents = require.context('./', true, /\.vue$/i);

VueComponents.keys().map(key => {
    const name = `Vue${key.split('/').pop().split('.')[0]}`;
    return Vue.component(name, VueComponents(key).default)
});

const APP = new Vue({
    el: '#app',
});
