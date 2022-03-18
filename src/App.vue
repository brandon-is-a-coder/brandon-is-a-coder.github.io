<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
        <span v-for="link in links" :key="link.text" class="router-link-span">
          <router-link :to="link.route" class="router-link">{{ link.text }}</router-link>
        </span>
      <v-spacer></v-spacer>

      <v-icon v-if="$vuetify.theme.dark" class="lightbulb" @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        mdi-lightbulb-on
      </v-icon>
      <v-icon v-if="!$vuetify.theme.dark" class="lightbulb" @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        mdi-lightbulb
      </v-icon>
    </v-app-bar>

    <v-main class="main-area">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { ActionTypes } from '@/components/resume/store/action-types'

export default Vue.extend({
  name: 'App',
  data: () => ({
    links: [
      {
        text: 'Home',
        route: '/'
      },
      {
        text: 'Resume',
        route: '/resume'
      }
    ]
  }),
  methods: {
    ...mapActions('resume', [ActionTypes.RESET_JOB_HISTORY])
  },
  mounted () {
    this[ActionTypes.RESET_JOB_HISTORY]()
  }
})
</script>
<style scoped>
.router-link-span {
  padding-right: 1em;
  letter-spacing: .05em;
  font-size: 1.5em;
  font-weight: 900;
}

.router-link:hover:not(.router-link-exact-active) {
  font-size: 1.1em;
}

.router-link {
  text-transform: uppercase;
  text-decoration: none;
  color: var(--v-accent-base)
}

.router-link-exact-active {
  color: var(--v-accent-darken2);
  font-size: 1.2em;
}

.lightbulb.v-icon {
  color: var(--v-accent-base)
}

.main-area {
  background-color: var(--v-background-base);
}
</style>
