<template>
  <v-data-table
    :headers="headers"
    :options.sync="options"
    :items="items"
    :server-items-length="itemsLength"
    sort-by="name"
    class="elevation-1"
    @update:options="getList"
    :footer-props="{
      itemsPerPageAllText: 'Все',
      itemsPerPageOptions: [10, 25, 50, 100, -1],
      itemsPerPageText: 'Количество на странице',
      showFirstLastPage: true,
      showCurrentPage: true,
      firstIcon: 'mdi-page-first',
      lastIcon: 'mdi-page-last',
      prevIcon: 'mdi-chevron-left',
      nextIcon: 'mdi-chevron-right'
    }"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="addItem">Добавить</v-btn>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Вы уверены что хотите удалить?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Отмена</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getList">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { HttpClient } from "../../common/httpClient";
import { RequestQueryBuilder } from "@nestjsx/crud-request";

export default {
  name: "List",
  props: ["route", "title", "headers"],
  data: () => ({
    dialogDelete: false,
    options: {},
    items: [],
    selected: {},
    itemsLength: 0
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  methods: {
    async getList() {
      const query = RequestQueryBuilder.create({
        sort: [
          {
            field: this.options.sortBy[0],
            order: this.options.sortDesc[0] ? "DESC" : "ASC"
          }
        ],
        page: this.options.page,
        limit: this.options.itemsPerPage,
        resetCache: true
      }).query();

      const { data: result } = await HttpClient.request({
        method: "GET",
        url: `/${this.route}?${query}`
      });

      this.items = result.data;
      this.itemsLength = result.total;
    },

    deleteItem(item) {
      this.selected = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await HttpClient.request({
        method: "DELETE",
        url: `/${this.route}/${this.selected?.id}`
      });

      await this.getList();
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.selected = {};
      });
    },

    editItem(item) {
      this.$router.push(`${this.route}/${item.id}`);
    },

    addItem() {
      this.$router.push(`${this.route}/0`);
    }
  }
};
</script>
