<template>
  <nav>
    <v-app-bar flat app color="#ecf0f1" class="lighten-5" elevation="6">
      <v-btn fab depressed color="blue-grey lighten-5 grey--text" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title class="text-center">
        <div style="margin-left: 340px; font-size: 20px; display: flex;">
          <v-img :src="require('@/assets/logo.png')" width="31px" height="31px"></v-img>      
          <span style="margin-top: 4px;">CRUD-HISTO VueJs</span>
        </div>
          
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app color="#18bc9d" v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            
            <v-img :src="require('@/assets/unsplash5.png')" width="50px" height="50px" style="margin-left:80px;"></v-img>
            <div style="margin-top: 8px; margin-left: 50px;">
              <span style="font-size: 26px;color: white;font-family: 'Monotype Corsiva', sans-serif; margin-top: 80px;">          
           My Appart</span>         
            </div>
          
          </v-list-item-title> 
         
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
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
        drawer: true,
        links: [
          { icon: 'home', text: 'Accueil', route: '/'},
          {icon: 'chart-bar', text: 'Histogramme', route: '/histogram'},
          {icon: 'menu', text: 'Mon Test', route: '/test'},
        ],
        
      }
    }

  }
</script>
<style scoped>

</style>
