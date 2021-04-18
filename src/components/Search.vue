<template>
  <div>
    <div
      class="search-gmar"
      :class="{
        'search-gmar--1-120': search_buttom == false,
        'search-gmar--1': search_buttom == false && search_view == false,
      }"
    >
      <div class="search-gmar__input">
        <i class="el-icon-search" v-if="!load_search"></i>
        <i class="el-icon-loading" v-else></i>
        <input
          type="text"
          :placeholder="placeholder"
          class="border-none"
          v-model="search.text"
          @keyup="getRecords()"
        />
      </div>
      <div class="search-gmar__view" v-if="search_view != false">
        <a @click="type_list_card" :class="{ selected: type_list == true }">
          <i class="el-icon-menu"></i>
        </a>
        <a @click="type_list_list" :class="{ selected: type_list == false }">
          <i class="el-icon-tickets"></i>
        </a>
      </div>
      <slot name="button"></slot>
    </div>
    <div class="table_container">
      <div class="table_grid" v-if="!load_search">
        <template v-if="records.length > 0">
          <template v-if="type_list">
            <slot
              name="grid"
              v-for="(row, index) in records"
              :row="row"
              :index="index"
              :loading="load_search"
            ></slot>
            <a class="spanner" v-for="i in 6" :key="i * 1.5"> </a>
          </template>
          <template v-else>
            <div class="table">
              <div class="table__responsive">
                <table>
                  <thead>
                    <slot name="heading"></slot>
                  </thead>

                  <tbody
                    v-loading="load_search"
                    element-loading-text="Cargando..."
                    element-loading-spinner="el-icon-loading"
                  >
                    <slot
                      name="tbody"
                      v-for="(row, index) in records"
                      :row="row"
                      :index="customIndex(index)"
                      :loading="load_search"
                    ></slot>
                  </tbody>
                </table>
              </div>
              <div>
                <!-- <el-pagination
									small
									:pager-count="5"
									@current-change="getRecords"
									layout="total, prev, pager, next"
									:total="pagination.total"
									:current-page.sync="pagination.current_page"
									:page-size="pagination.per_page"
								></el-pagination> -->
              </div>
            </div>
            <slot
              name="table"
              v-for="(row, index) in records"
              :row="row"
              :index="index"
              :loading="load_search"
            ></slot>
          </template>
        </template>
        <template v-else>
          <slot name="empty"></slot>
        </template>
      </div>
      <div class="table_grid" v-else>
        <slot name="loading"></slot>
      </div>

    </div>
  </div>
</template>
<script>
import HttpClient from "../core/http/HttpClient";
import Endpoints from "../core/http/Endpoints";
const { list } = Endpoints;

export default {
  props: [
    "type_list",
    "placeholder",
    "resource",
    "state_init",
    "establishment_id_init",
    "search_buttom",
    "search_view",
    "maestro_prop",
    "is_module_prop",
    "is_bond_allocation_prop",
  ],
  mixins: ["typeView"],
  components: {},
  data: () => ({
    records: [],
    load_search: false,
    pagination: {},
    search: {
      text: "",
      state: null,
      establishment_id: null,
      type: null,
      d_start: null,
      d_end: null,
      is_module: null,
      is_bond_allocation: null,
      maestro: null,
    },
  }),
  watch: {
    is_module_prop(val) {
      this.getRecords();
    },
  },
  mounted() {
    this.getRecords();
  },
  created() {
    this.search.state = this.state_init;
    this.search.establishment_id = this.establishment_id_init;

    window.eventHub.$on("reloadGetRecords", () => {
      this.getRecords();
    });
  },
  methods: {
    type_list_card() {
      this.$emit("update:type_list", true);
    },
    type_list_list() {
      this.$emit("update:type_list", false);
    },
    customIndex(index) {
      return (
        this.pagination.per_page * (this.pagination.current_page - 1) +
        index +
        1
      );
    },
    getRecords() {
      this.load_search = true;
      this.search.is_module =
      this.is_module_prop && this.is_module_prop != 0
          ? this.is_module_prop
          : null; 
      this.search.is_bond_allocation =
        this.is_bond_allocation_prop && this.is_bond_allocation_prop != 0
          ? this.is_bond_allocation_prop
          : null;
      this.search.maestro = this.maestro_prop;

      const [endpoint] = list({
          token: AuthStorage.token,
          resource: this.resource,
          search_input: this.search.text,
          establishment_id: this.search.establishment_id,
          state: this.search.state,
          type: this.search.type,
          d_start: this.search.d_start,
          d_end: this.search.d_end,
          is_module: this.search.is_module,
          is_bond_allocation: this.search.is_bond_allocation,
          maestro: this.search.maestro,
          page: this.pagination.current_page,
      });

      HttpClient.request(endpoint)
        .then((response) => {
          this.records = response.data.data;
          this.pagination = response.data.meta;
          this.pagination.per_page = parseInt(response.data.meta.per_page);
          this.load_search = false;
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data;
            this.load_search = false;
          } else {
            this.load_search = false;
            console.log(error);
          }
        });
    },
  },
};
</script>
