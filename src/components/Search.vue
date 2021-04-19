<template>
     <div class="header">
        <div class="header__input">
          <input
            type="text"
            placeholder="Buscar"
            v-model="value"
            @keyup="getList()"
          />
          <span class="fasearch" v-if="!loading" >
            <font-awesome-icon icon="search" />
          </span>
          <span class="fasearch spinner" v-else> 
            <font-awesome-icon icon="circle-notch" />
          </span>
        </div>
        <div class="header__user">
          <span class="fauser">
            <font-awesome-icon icon="user" />
          </span>
          <p class="">Francisco M.</p>
        </div>
      </div>
</template>
<script>
import jsonp from "simple-jsonp-promise";
import Endpoints from "../core/http/Endpoints";
const { getListItem } = Endpoints;

export default {
  props: [
    "type"
  ],
  components: {},
   data() {
    return {
      getRecords: [],
      loading: false,
      value: "",
    };
  },
  created() {
    this.$eventHub.$on("initList", () => {
        this.getList();
    });
  },
  methods: {
       async getList() {
         this.loading= true;

          const url = getListItem({ type: this.type,value: this.value.toString() }).url;

          const response = await jsonp(url, { data: "" });
          this.getRecords = response.data; 
          this.$emit('getData', this.getRecords);
          this.loading = false;
        },
  },
};
</script>
