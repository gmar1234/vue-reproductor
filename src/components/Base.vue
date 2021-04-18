<template>
  <div class="container">
    <div class="side">
      <div class="logo">
        <img :src="require('../assets/img/foxbel-music.png')" alt="" />
      </div>
      <div class="nav">
        <h1 class="nav__title">Mi Librería</h1>
        <ul class="nav__items">
          <li class="nav__item">
            <a href="#" class="active">Recientes</a>
          </li>
          <li>
            <a href="">
              Artistas
            </a>
          </li>
          <li>
            <a href="">
              Álbums
            </a>
          </li>
          <li>
            <a href="">
              Canciones
            </a>
          </li>
          <li>
            <a href="">
              Estaciones
            </a>
          </li>
        </ul>

        <h1 class="nav__title mt-30">Playlist</h1>
        <ul class="nav__items">
          <li>
            <a href="">
              Metal
            </a>
          </li>
          <li>
            <a href="">
              Para bailar
            </a>
          </li>
          <li>
            <a href="">
              Rock 90s
            </a>
          </li>
          <li>
            <a href="">
              Baladas
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="header">
        <div class="header__input">
          <input
            type="text"
            placeholder="Buscar"
            v-model="value"
            @keyup="getList()"
          />
          <span class="fasearch">
            <font-awesome-icon icon="search" />
          </span>
        </div>
        <div class="header__user">
          <span class="fauser">
            <font-awesome-icon icon="user" />
          </span>
          <p class="">Francisco M.</p>
        </div>
      </div>

      <component-data :artistSelect="artistSelect" :isPlay="isPlay"></component-data>
      
      <audio
        ref="audio"
        :src="artistSelect.preview"
        preload
        volume="20"
        loop
        id="audio"
        muted
      ></audio>

      <div class="bloquote">
        <h1>Resultados</h1>
      </div>
      <div class="results">
        <div
          class="results__item"
          v-for="(item, index) in getRecords"
          :key="index"
          
        >
          <font-awesome-icon class="option_tool" icon="ellipsis-v" />
          <div class="options_play" @click="selectArtist(item)">
            <span class="faplay">
              <font-awesome-icon icon="play" />
            </span>
          </div>
          <img :src="item.artist.picture_medium" class="img" alt="" />
          <h1 class="song">{{ item.title_short }}</h1>
          <p class="artist">{{ item.artist.name }}</p>
        </div>
      </div>
    </div>

    <div class="player">
      <div class="player__img">
        <img :src="artistSelect.artist.picture_medium" class="img" alt="" />
      </div>
      <div class="player__control">
        <div class="player__data">
          <h1 class="song">{{ artistSelect.title }}</h1>
          <p>{{ artistSelect.artist.name }} - {{ artistSelect.album.title }}</p>
        </div>
        <div class="player__type">
          <span class="back">
            <font-awesome-icon icon="step-backward" />
          </span>
          <span class="play" @click="toggleSound()">
            <font-awesome-icon icon="play" v-if="!isPlay" />
            <font-awesome-icon icon="pause" v-else />
          </span>
          <span class="next">
            <font-awesome-icon icon="step-forward" />
          </span>
        </div>
        <div class="player__vol">
          <span class="mute" @click="mute()">
            <font-awesome-icon icon="volume-mute" />
          </span>

          <input
            v-model.lazy.number="volume"
            class="player-volume"
            type="range"
            min="0"
            max="100"
          />

          <span class="vol" @click="up()">
            <font-awesome-icon icon="volume-up" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import HttpClient from "../core/http/HttpClient";
import jsonp from "simple-jsonp-promise";
import Endpoints from "../core/http/Endpoints";
import ComponentData from "./Data";
const { getArtist } = Endpoints;

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: { ComponentData },
  data() {
    return {
      getRecords: [],
      loading: false,
      artistSelect: {
        album: "",
        artist:{} 
      },
      isPlay: false,
      value: "",
      volume: 100,
    };
  },
  async mounted(){
    await this.getList();
  },
  created() {
    
    this.$eventHub.$on("playMusic", () => {
        this.toggleSound();
    });
  },
  watch: {
    volume() {
      let audio = this.$refs.audio;
      audio.volume = this.volume / 100;
    },
  },
  methods: {
    async getList() {
      const url = getArtist({ artist: this.value.toString() }).url;

      const response = await jsonp(url, { data: "" });
      this.getRecords = response.data;
      this.artistSelect = this.getRecords[0];
    },
    selectArtist(item) {
      this.artistSelect = item;
      let audio = this.$refs.audio;
      this.isPlay = true;
      audio.play();
    },
    mute() {
      this.volume = 0;
    },

    up() {
      this.volume = 100;
    },

    toggleSound() {
      let audio = this.$refs.audio;
      if (audio.paused) {
        this.isPlay = true;
        audio.play();
      } else {
        this.isPlay = false;
        audio.pause();
      }
    },

    vole() {
      let audio = this.$refs.audio;
      audio.v;
    },
  },
};
</script>
