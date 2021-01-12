<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-if="!isNew"
          v-model="item.id"
          label="ID"
          outlined
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="item.name"
          label="Наименование"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          v-model="item.brand"
          :items="brands"
          label="Бренд"
          item-text="name"
          item-value="id"
          outlined
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="item.category"
          :items="categories"
          item-text="name"
          item-value="id"
          label="Категория"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="item.searchText"
          label="Поисковый запрос"
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="item.price" label="Цена" outlined></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-img :src="item.image"></v-img>
      </v-col>
      <v-col cols="12" sm="6">
        <v-textarea
          :value="item.description"
          label="Описание"
          outlined
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="search" width="1000px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Подобрать
          </v-btn>
        </template>
        <Search></Search>
      </v-dialog>
      <v-col cols="12">
        <v-btn @click="cancel">Отмена</v-btn>
        <v-btn @click="save">Сохранить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Item from "../../mixins/Item";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { HttpClient } from "../../common/httpClient";
import Search from "../aliexpress/Search";

export default {
  name: "Product",
  components: { Search },
  mixins: [Item],
  data() {
    return {
      item: {
        id: "",
        name: "",
        description: "",
        image: "",
        price: 0,
        searchText: "",
        brand: {
          id: "",
          name: ""
        },
        category: {
          id: "",
          name: ""
        }
      },
      brands: [],
      categories: [],
      search: false
    };
  },

  async created() {
    this.brands = await this.getSelectData("brands");
    this.categories = await this.getSelectData("categories");
  },

  methods: {
    prepareQuery() {
      return RequestQueryBuilder.create()
        .setJoin({ field: "brand", select: ["id", "name"] })
        .setJoin({ field: "category", select: ["id", "name"] })
        .query(false);
    },

    async getSelectData(route) {
      const { data } = await HttpClient.request({
        method: "GET",
        url: `/${route}?select=id,name`
      });
      console.log(data);
      return data;
    }
  }
};
</script>

<style scoped></style>
