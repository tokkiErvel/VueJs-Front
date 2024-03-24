<template>
    <v-row>
        <v-snackbar v-model="snackbar" top :timeout="2500" color="blue-grey" rounded="pill" >
            <v-icon color="">mdi-check-circle</v-icon>
            Modification avec succés !!!
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
        <v-btn depressed small class="mr-6" @click.stop="dialog = true" color="#f29b12">
            <v-icon color="white">mdi-pencil</v-icon>
        </v-btn>
        <v-dialog max-width="600px" persistent v-model="dialog">
            <v-card>
                <v-card-title>                  
                    <v-icon color="#757575" style="font-size: 50px;">mdi-pencil-circle</v-icon>                    
                    <h1 class="display-1" style="margin-left: 11px;">Modifier un appartement</h1>
                    <v-btn @click.stop="dialog = false" elevation="0" style="margin-left: 52px; background-color: white;">
                        <v-icon style="font-size: 28px;">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row style="margin-top: 7px;">
                            <v-col>                            
                                <v-select :items="monNumApp" label="NumApp" v-model="numAppMod" outlined required></v-select>
                            </v-col>
                            
                        </v-row>
                        <v-row style="margin-top: -25px;">
                            <v-col>
                                <v-select :items="monDesign" label="Design" v-model="designMod" outlined required></v-select>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: -25px;">
                            <v-col>
                                <v-text-field label="Loyer" v-model.number="loyerMod" outlined required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-btn @click="updateAppart(idApp)">Modifier</v-btn>
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
       
        idApp: {
            type: Number,    
        },
        numApp : {
            type: String,
        
        },
        design: {
            type: String,
        },
        loyer: {
            type: Number, 
        }
    },
    data() {
        return {
           dialog: false,
           numAppMod : this.numApp,
           designMod: this.design,
           loyerMod: this.loyer,
           snackbar: false,
           monDesign: ['Design1', 'Design2', 'Design3', 'Design4', 'Design5'],
           monNumApp: ['Appart01', 'Appart02', 'Appart03', 'Appart04', 'Appart05'],
        }
    },
    methods: {
        updateAppart(idApp){
            const dataOfAppart = {
                numApp: this.numAppMod,
                design: this.designMod,
                loyer: this.loyerMod,           
            }

            axios.put(`http://localhost:3000/appartement/${idApp}`, dataOfAppart).then(() => {            
                this.dialog = false;
                this.snackbar = true;
                this.$emit('updated');
        }).catch((error) => {
          console.error("Erreur..!", error);
        })
        }
      
    }, 
  }
</script>