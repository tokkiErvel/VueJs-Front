<template>
    <nav>
      <v-app-bar flat app class="blue-grey lighten-5">
        <v-btn fab depressed color="blue-grey lighten-5 grey--text" @click="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-toolbar-title class="text-uppercase lighten-4">
            <span class="grey--text caption">MY</span>
            <span class="headline">Appart</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn depressed dark color="grey">
            <span>Deconnexion</span>
            <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-navigation-drawer app class="primary" v-model="drawer">
         <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon class="white--text">mdi-{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         </v-list>
      </v-navigation-drawer>
  
    </nav>
  </template>
  
  <script>
    
  
    export default {
      name: 'myMenu',
      data() {
        return {
          drawer: false,
          links: [
            { icon: 'home', text: 'Accueil', route: '/'},
            {icon: 'chart-bar', text: 'Histogramme', route: '/histogram'},
            {icon: 'menu', text: 'Mon Test', route: '/test'},
          ]
        }
      }
  
    }
  </script>
  