import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        background: '#99C24D',
        accent: '#6EA4BF',
        primary: '#FF934F',
        secondary: '#545863',
        surface: '#FFF7F8',

        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },

      dark: {
        background: '#000000',
        accent: '#ef6c00',
        primary: '#121212',
        secondary: '#565656',
        surface: '#ff0022'
      }
    }
  }
})
