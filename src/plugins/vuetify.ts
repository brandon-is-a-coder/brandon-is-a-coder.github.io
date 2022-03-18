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
        background: '#a9a2a2',
        secondary: '#385369',
        primary: '#363c42',
        accent: '#99C24D',

        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
      dark: {
        background: '#2c2c31',
        primary: '#6EA4BF',
        secondary: '#5c5060',
        accent: '#ef6c00'
      }
    }
  }
})
