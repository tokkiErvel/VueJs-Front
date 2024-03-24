<template>
  <div class="home">
    <navbartest></navbartest>
    <v-container>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
        <v-snackbar
      v-model="snackbar" top :timeout="2500" color="blue-grey" rounded="pill"
    >
    <v-icon color="">mdi-check-circle</v-icon>
      Suppression avec succés !!!
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <addpopup @updated="displayData" style="margin-left: 48px;position: relative;margin-top: 1px;"></addpopup>

    <v-container style="height: 600px; width: 1000px; overflow-y: auto; margin-top:15px;" >
      <v-card elevation="1" flat class="pa-3 grey lighten-5" style="margin-right:2px;">
      <v-row>
        <v-col>
          <v-card v-for="appartement in displayedAppartements" :key="appartement.idApp" flat class="pa-5 grey lighten-5"> 
              <v-layout row wrap>
                <v-flex>
                  <div class="caption grey--text">NumApp</div>
                  <div>{{appartement.numApp}}</div>
                </v-flex>
                <v-flex mr-3>
                  
                    <div class="caption grey--text">Design</div>
                   <div>{{appartement.design}}</div>
                  
                   
                </v-flex>
                <v-flex>
                   <div class="caption grey--text">Loyer</div>
                   <div>{{appartement.loyer}}</div>
                </v-flex>
                <v-flex>
                   <div class="caption grey--text">Obs</div>
                   <div style="margin-top:-8px;">
                    <v-chip dark class="ma-2" small min-height="100" v-bind:color="getColor(appartement.loyer)">
                  {{ getObservation(appartement.loyer) }}
                    </v-chip>
                   </div>
                </v-flex>
                
                <v-flex mt-7 md1>
                  <div>
                    <updatepopup @updated="displayData" v-bind:idApp="appartement.idApp" v-bind:numApp="appartement.numApp" v-bind:design="appartement.design" v-bind:loyer="appartement.loyer"></updatepopup>
                  </div>
                </v-flex>
                <v-flex mt-4 md1>
                  <div>
                      <v-btn @click.stop="openConfirmDialog(appartement.idApp)" depressed small class="white--text" color="#e64a3b">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        
                    </div>  
                </v-flex>          
              </v-layout>      
            </v-card>
        </v-col>
      </v-row>
    </v-card>
      
  <v-row>
    <v-dialog
      v-model="dialog"
      max-width="400"     
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon>mdi-alert</v-icon>
          <span style="margin-left: 10px;">Supprimer ?</span>
        </v-card-title>

        <v-card-text>
          Ce champ d'appartement sera supprimé
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            ANNULER
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="deleteAppart(appartToDelete)"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

<v-expansion-panels elevation="0" style="margin-top: 30px;">
  <v-expansion-panel>
        <v-expansion-panel-header>
          <span style="font-style:italic; font-size: 13px; font-family:Maiandra GD;">Voir somme, minimal, maximal de loyer</span>
          <template v-slot:actions>
            <v-icon color="primary">
              $expand
            </v-icon>
          </template>

        </v-expansion-panel-header>
        
        <v-expansion-panel-content>
          <div style="display:flex">
          <div><v-col><p> <v-icon>mdi-plus-circle</v-icon> Somme: {{ sumLoyer }}</p></v-col></div>
          <div><v-col><p> <v-icon>mdi-arrow-up-bold</v-icon> Loyer maximal: {{ maxLoyer }}</p></v-col></div>
          <div><v-col><p> <v-icon>mdi-arrow-down-bold</v-icon> Loyer minimal: {{ minLoyer }}</p></v-col></div>
          </div>
          
          
           
        </v-expansion-panel-content>
      </v-expansion-panel>
</v-expansion-panels>

    </v-container>
    
    <v-footer style="margin-top: -230px; background-color: white;">
        <v-col>
          <v-pagination
            v-model="page"
            :length="Math.ceil(appartements.length / perPage)"
            color="#0c7864"
            
          ></v-pagination>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          Result {{ (page - 1) * perPage + 1 }} to {{ Math.min(page * perPage, appartements.length) }}
        </v-col>
      </v-footer>
  </v-container>
  
  </div>
</template>

<script>
import axios from 'axios';
import NavbarTest from '@/components/NavbarTest.vue';
import AddPopup from '@/components/AddPopup.vue';
import UpdatePopup from '@/components/UpdatePopup.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      appartements: [],
      idApp: 0,
      numApp: '',
      dialog: false,
      snackbar: false,
      items: [
        { icon: 'home', text: 'Dashboard', route: '/' },
        { icon: 'menu', text: 'Accueil', route: '/home' },
      ],
      page: 1,
      perPage: 4,
      sumLoyer: 0,
      minLoyer: 0,
      maxLoyer: 0
    }
  },

  mounted() {
    this.displayData();
    this.afficheLoyer();
  },

  computed: {
    displayedAppartements() {
      const startIndex = (this.page - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.appartements.slice(startIndex, endIndex);
    }
  },

  methods: {
    displayData(){
      axios.get("http://localhost:3000/appartement").then(response => {
        this.appartements = response.data.map((appartement, index) => ({ ...appartement, index }));
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
    afficheLoyer(){
      axios.all([
         axios.get('http://localhost:3000/minLoyer'),
         axios.get('http://localhost:3000/maxLoyer'),
         axios.get('http://localhost:3000/sumLoyer')
       ])
       .then(axios.spread((minResponse, maxResponse, sumResponse) => {
         this.minLoyer = minResponse.data.minimale;
         this.maxLoyer = maxResponse.data.maximale;
         this.sumLoyer = sumResponse.data.somme;
       }))
       .catch(error => {
         console.error('Error fetching data:', error);
       });
    },
    getObservation(loyer) {
      if (loyer < 1000) {
        return "bas";
      } else if (loyer >= 1000 && loyer <= 5000) {
        return "moyen";
      } else {
        return "élevé";
      }
    },
    getColor(loyer) {
      if (loyer < 1000) {
        return "primary"; // couleur pour obs "bas"
      } else if (loyer >= 1000 && loyer <= 5000) {
        return "green"; // couleur pour obs "moyen"
      } else {
        return "pink"; // couleur pour obs "élevé"
      }
    }
  },

  components: {
    'addpopup': AddPopup,
    'updatepopup': UpdatePopup,
    'navbartest': NavbarTest
  }
}  
</script>

<style scoped>

</style>
