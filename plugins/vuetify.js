import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify,{
    theme: {
        primary: '#9652ff',
        success: "#3cd1c2",
        info: "#ffaa2c",
        error: "#f83e70"
    }
});

export default new Vuetify({
    theme: {
        options: {
          customProperties: true,
        },
      themes: {
        light: {
          primary: '#007BFF',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
      },
    },
  });
