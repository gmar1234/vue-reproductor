<template>
  <div class="results__item" @click="select()">
    <font-awesome-icon class="option_tool" icon="ellipsis-v" />
    <div class="options_play">
      <span class="faplay">
        <font-awesome-icon icon="play" /> 
      </span>
    </div>
    <img :src="item.artist.picture_medium" class="img" alt="" />
    <h1 class="song">{{ item.title_short }}</h1>
    <p class="artist">{{ item.artist.name }}</p>
  </div>
</template>

<script>
export default {
  name: "artist",
  props: {
    item: Object,
    isPlay: Boolean,
  },
  data() {
    return { 
    };
  },
  created() {},
  methods: {
    async select() {
     await this.$eventHub.$emit("selectArtist",this.item);
     await this.$eventHub.$emit("playMusic");
    },
  },
};
</script>
