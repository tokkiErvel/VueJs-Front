<template>    
    <v-row>
        <v-snackbar v-model="snackbar" top :timeout="2500" color="blue-grey" rounded="pill">
            <v-icon color="">mdi-check-circle</v-icon>
            Ajout avec succés !!!
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
        
        <div style="display: flex;">

          <v-btn dark color="#2d3f51" @click.stop="dialog = true">
            <v-icon>mdi-plus</v-icon>Ajouter            
          </v-btn>

          <v-spacer></v-spacer>
          <div>
            
          </div>
          
        </div>

        <v-dialog max-width="600px" persistent v-model="dialog">
            <v-card>
                <v-card-title>
                    
                      <v-icon color="#757575" style="font-size: 50px;">mdi-plus-circle</v-icon>
                    
                    <h1 class="display-1" style="margin-left: 11px;">Ajouter un appartement</h1>

                    <v-btn @click.stop="dialog = false" elevation="0" style="margin-left: 66px; background-color: white;">
                        <v-icon style="font-size: 28px;">mdi-close</v-icon>
                    </v-btn>

                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row style="margin-top: 7px;">
                            <v-col>
                                <v-select :items="monNumApp" label="NumApp" v-model="numApp" outlined required></v-select>
                            </v-col>                          
                        </v-row>
                        <v-row style="margin-top: -25px;">
                            <v-col>
                                <v-select :items="monDesign" label="Design" v-model="design" outlined required></v-select>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: -25px;">
                            <v-col>
                                <v-text-field label="Loyer" v-model.number="loyer" outlined required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-btn @click="addAppart">Ajouter</v-btn>
                                <v-btn class="ml-3" @click.stop="dialog = false">Annuler</v-btn>                           
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>    
</template>
<script>
import axios from 'axios';
  export default {
    name: 'AddPopup',
    props: {
        
    },
    data() {
        return {
            dialog: false,
            numApp: '',
            design: '',
            loyer: 0,
            snackbar: false,
            monDesign: ['Design1', 'Design2', 'Design3', 'Design4', 'Design5'],
            monNumApp: ['Appart01', 'Appart02', 'Appart03', 'Appart04', 'Appart05'],
        }
    },
    methods: {
        addAppart(){
            const dataOfAppart = {
                numApp: this.numApp,
                design: this.design,
                loyer: this.loyer,
                
            }

            axios.post('http://localhost:3000/appartement/add', dataOfAppart).then(() => {
                 this.snackbar = true;
                 this.dialog = false;
                 this.$emit('updated');
                 
        }).catch(error => {
          console.error("Erreur..!", error);
        })
        }
    }
  }
</script>