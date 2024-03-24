<template>
  <v-fragment>
    <navbartest></navbartest>
    <v-container>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-row>
      <v-col
        cols="6"
        md="4"       
      >        
          <v-btn dark color="#2d3f51">
            <v-icon>mdi-plus</v-icon>Ajouter            
          </v-btn>       
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="6" md="3" mt-10>     
      
      <v-card>
          <v-btn dark color="#2d3f51">
            <v-icon>mdi-magnify</v-icon>            
          </v-btn> 
        </v-card>                 
      </v-col>
      
    </v-row>



    <v-card class=""  style="margin-top: 20px; color: ;">
      <v-data-table :headers="headers" :items="desserts" class="elevation-1" color="#7c8a8b">
        <v-card v-for="appartement in appartements" :key="appartement.idApp" flat class="pa-3 grey lighten-5"> 
              <v-layout row wrap>
                <v-flex md3>
                  
                  <div>{{appartement.numApp}}</div>
                </v-flex>
                <v-flex>
                   
                   <div>{{appartement.design}}</div>
                </v-flex>
                <v-flex>
                   
                   <div>{{appartement.loyer}}</div>
                </v-flex>
                <v-flex>
                   
                   <div>{{appartement.obs}}</div>
                </v-flex>
                <v-flex mt-7 md1>
                  <div>
                    <updatepopup @updated="displayData" v-bind:idApp="appartement.idApp" v-bind:numApp="appartement.numApp" v-bind:design="appartement.design" v-bind:loyer="appartement.loyer"></updatepopup>
                  </div>
                </v-flex>
                <v-flex mt-4 md1>
                  <div>
                      <v-btn @click.stop="openConfirmDialog(appartement.idApp)" depressed small class="red white--text">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </div>  
                </v-flex>          
              </v-layout>      
            </v-card>
      </v-data-table>
    </v-card>

  </v-container>

    <v-footer>
      <v-col>
    <v-pagination
      v-model="page"
      :length="6"
      color="#0c7864"
    ></v-pagination>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        Result 1 to 5
      </v-col>
    </v-footer>
  
  </v-fragment>
</template>
<script>
import axios from 'axios';

import NavbarTest from '@/components/NavbarTest.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      appartements: [],
      idApp: 0,
      numApp: '',
      dialog: false,
      snackbar: false,
      value: 1,
      active: true,
      items: [
          {icon: 'home', text: 'Dashboard', route: '/'},
          
          {icon: 'menu', text: 'Mon Test', route: '/Mon%test'},
      ],
      page: 1,
      headers: [
          {
            text: 'Action',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'NumApp', value: 'numApp' },
          { text: 'Design', value: 'desing' },
          { text: 'Loyer', value: 'loyer' },
          { text: 'Obs', value: 'obs' },
          
        ],
    }
    
    },

  mounted() {
    this.displayData();
  },

  methods: {
    displayData(){
        axios.get("http://localhost:3000/appartement").then(response => {
          this.appartements = response.data;
        }).catch(error => {
          console.error("Erreur..!", error);
        })
    },
    
    deleteAppart(appartement){
      axios.delete(`http://localhost:3000/appartement/${appartement}`).then(() => {
          this.dialog = false;
          this.snackbar = true;
          this.displayData();
        }).catch(error => {
          console.error("Erreur..!", error);
        })
    }, 
    openConfirmDialog(appartementId) {
    this.appartToDelete = appartementId;
    this.dialog = true;
    },  
  },
  components: {
    
    'navbartest': NavbarTest
  }
}  
</script>