<template>
          <div class="data">
        <div class="data__img">
          <img :src="artistSelect.artist.picture_medium" alt="" />
            <div class="options_play" @click="play()" >
            <span class="faplay">
              <font-awesome-icon icon="play" v-if="!isPlay" />
              <font-awesome-icon icon="pause" v-else />

            </span>
          </div>
        </div> 
        <div class="data__description" v-bind:style="{ 'background-image': 'linear-gradient(to right bottom, rgba(195, 137, 136, 0.9), rgba(195, 137, 136, 0.9)),url(' + artistSelect.artist.picture_big + ')' }">
          <div class="data__header">
            <h1>{{artistSelect.artist.name}} {{artistSelect.title_short}}</h1> 
            <p>Lo mejor de {{artistSelect.artist.name}} <span>{{artistSelect.rank}} seguidores</span></p>
          </div> 
          <div class="data__history" >
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum in
              provident, quod ipsam a ut hic temporibus, veniam beatae commodi
              libero at, consequuntur fugit similique corporis repudiandae
            </p>
          </div>

          <div class="data__buttons">
            <a href="" class="primary">Reproducir</a>
            <a href="" class="secondary">Seguir</a>
            <span class="options">
               <font-awesome-icon class="option_tool" icon="ellipsis-h" />
            </span>
          </div>
        </div>
      </div>
</template>

<script>

export default {
  name: "artist",
  props: {
    artistSelect: Object,
    isPlay: Boolean
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    play(){
      this.$eventHub.$emit("playMusic");
    }
  },
};
</script>
