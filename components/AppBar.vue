<template>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#00695C"
        dark
        
        
        
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            
          ></v-img>
        </template>
  
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
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
      <v-sheet
        id="scrolling-techniques-5"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-container style="height: 1500px;"></v-container>
      </v-sheet>
    </v-card>
  </template>
