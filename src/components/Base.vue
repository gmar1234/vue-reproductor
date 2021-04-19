<template>
  <div class="container">
    <div class="side">
      <div class="logo">
        <img src="../assets/img/foxbel-music.png" alt="" />
      </div>
      <div class="nav">
        <h1 class="nav__title">Mi Librería</h1>
        <ul class="nav__items">
          <li class="nav__item">
            <a href="#" :class="{active: tab == 0}" @click="optionTab(0,'track')">Recientes</a>
          </li>
          <li>
            <a href="#" :class="{active: tab == 1}" @click="optionTab(1,'artist')" >
              Artistas
            </a>
          </li>
          <li>
            <a href="#" :class="{active: tab == 2}" @click="optionTab(2,'album')">
              Álbums
            </a>
          </li>
          <li>
            <a href="#" :class="{active: tab == 3}" @click="optionTab(3,'track')">
              Canciones
            </a>
          </li>
          <li>
            <a href="#" :class="{active: tab == 4}" @click="optionTab(4,'label')">
              Estaciones
            </a>
          </li>
        </ul>

        <h1 class="nav__title mt-30">Playlist</h1>
        <ul class="nav__items">
          <li>
            <a href="#" :class="{active: tab == 5}" @click="tab=5">
              Metal
            </a>
          </li>
          <li>
            <a href="#" :class="{active: tab == 6}" @click="tab=6">
              Para bailar
            </a>
          </li>
          <li>
            <a href="#" :class="{active: tab == 7}" @click="tab=7">
              Rock 90s
            </a>
          </li>
          <li>
            <a href="#" :class="{active: tab == 8}" @click="tab=8">
              Baladas
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      
      <component-search v-on:getData="onResult" :type="type"></component-search>

      <component-data
        :artistSelect="artistSelect"
        :isPlay="isPlay"
      ></component-data>

      <div class="bloquote">
        <h1>Resultados</h1>
      </div>

      <div class="results">
        <component-card
          v-for="(item, index) in getRecords"
          :key="index"
          :item="item"
          :isPlay="isPlay"
        ></component-card>
      </div>
    </div>

    <component-player
      :artistSelect="artistSelect"
      :isPlay.sync="isPlay"
    ></component-player>
  </div>
</template>

<script>
import ComponentData from "./Data";
import ComponentSearch from "./Search";
import ComponentPlayer from "./Player";
import ComponentCard from "./Card";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    ComponentData,
    ComponentSearch,
    ComponentPlayer,
    ComponentCard
  },
  data() {
    return {
      getRecords: [],
      loading: false,
      artistSelect: {
        album: "",
        artist: {},
      },
      isPlay: false,
      volume: 100,
      type: 'track',
      tab: 0,
    };
  },
  async mounted() {
    this.$eventHub.$emit("initList");
   
  },
  created(){
     this.$eventHub.$on("selectArtist", (item) => {
      this.selectArtist(item);
    });
  },
  methods: {
    onResult(data) {
      this.getRecords = data;
      this.artistSelect = this.getRecords[0];
    },
    selectArtist(item) {
      this.artistSelect = item;  
    },
    optionTab(num,type){
        this.tab = num;
        this.type = type;
        this.$eventHub.$emit("initList");

    }
  },
};
</script>
