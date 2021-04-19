<template>
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
    <audio
      ref="audio"
      :src="artistSelect.preview"
      preload
      volume="20"
      loop
      id="audio"
      muted
    ></audio>
  </div>
</template>

<script>
export default {
  name: "artist",
  props: {
    artistSelect: Object,
    isPlay: Boolean,
  },
  data() {
    return {
      volume: 50,
    };
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
    toggleSound() {
      let audio = this.$refs.audio;
      if (audio.paused) {
        this.$emit("update:isPlay", true);
        audio.play();
      } else {
        this.$emit("update:isPlay", false);
        audio.pause();
      }
    },
    mute() {
      this.volume = 0;
    },

    up() {
      this.volume = 100;
    },
    vole() {
      let audio = this.$refs.audio;
      audio.v;
    },
  },
};
</script>
