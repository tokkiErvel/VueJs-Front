<template>
  <v-fragment>
     <navbartest></navbartest>
     <v-container>
       <v-breadcrumbs :items="items"></v-breadcrumbs>
       <v-card elevation="1">
         <v-card-text>
          <div style="width:460px; margin-left: 260px; background-color: #f0f3f5; padding: 25px; border-radius: 15px;">
            <canvas id="myChart"></canvas>
          </div>    
         </v-card-text>
       </v-card>
     </v-container>
  </v-fragment>
 </template>
 
 <script>
 import axios from 'axios';
 import NavbarTest from '@/components/NavbarTest.vue';
 import Chart from 'chart.js/auto';
 
 export default {
  name: 'myHisto',
  data() {
     return {
       items: [
         { icon: 'home', text: 'Dashboard', route: '/' },
         { icon: 'menu', text: 'Histogramme', route: '/histogramme' },
       ],
       minimale: null,
       maximale: null
     };
  },
  mounted() {
     this.fetchData();
  },
  methods: {
     fetchData() {
       axios.all([
         axios.get('http://localhost:3000/minLoyer'),
         axios.get('http://localhost:3000/maxLoyer'),
         axios.get('http://localhost:3000/sumLoyer')
       ])
       .then(axios.spread((minResponse, maxResponse, sumResponse) => {
         this.minimale = minResponse.data.minimale;
         this.maximale = maxResponse.data.maximale;
         this.somme = sumResponse.data.somme;
         this.createChart();
       }))
       .catch(error => {
         console.error('Error fetching data:', error);
       });
     },
     createChart() {
       const ctx = document.getElementById('myChart').getContext('2d');
       new Chart(ctx, {
         type: 'pie',
         data: {
           labels: ['Loyer minimal', 'Loyer maximal', 'Somme loyer'],
           datasets: [{
             label: 'Loyers',
             data: [this.minimale, this.maximale, this.somme],
             backgroundColor: [
               'rgba(241, 165, 78, 0.973)',
               'rgba(216, 63, 96, 0.87)',
               'rgba(95, 104, 116, 0.87)'             
             ],
             
             borderWidth: 1,
             barPercentage: 0.5
           }]
         },
         options: {
           scales: {
             y: {
               beginAtZero: true
             }
           }
         }
       });
     }
  },
  components: {
     'navbartest': NavbarTest
  }
 };
 </script>
 
 <style scoped>

 /* Ajoutez ici vos personnalisations de style pour l'histogramme */
 </style>