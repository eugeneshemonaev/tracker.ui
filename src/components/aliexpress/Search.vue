<template>
  <v-card max-width="1000" class="mx-auto">
    <v-app-bar color="pink">
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="options.searchText"
            label="Solo"
            placeholder="Текст поиска"
            solo
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="options.minPrice"
            label="Solo"
            placeholder="Мин цена"
            type="number"
            solo
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="options.maxPrice"
            label="Solo"
            placeholder="Макс цена"
            type="number"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="options.freeShipping"
            label="Бесплатная доставка"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="options.isFavorite"
            label="4 звезды и более"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-select :items="sortBy" label="Сортировать по" solo></v-select>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>

      <v-btn icon @click="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card dark>
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.images[0]"></v-img>
            </v-avatar>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.store.name"></v-card-subtitle>
                <span class="grey--text text--lighten-2 caption mr-2">
                  ({{ item.rating }})
                </span>
                <v-rating
                  v-model="item.rating"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  half-increments
                  hover
                  size="18"
                ></v-rating>
                <span class="grey--text text--lighten-2 caption mr-2">
                  Цена: {{ item.price }})
                </span>
                  <span class="grey--text text--lighten-2 caption mr-2">
                  Продано: {{ item.orders }})
                </span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { HttpClient } from "../../common/httpClient";

export default {
  name: "Search",
  data() {
    return {
      options: {
        minPrice: 0,
        maxPrice: 0,
        freeShipping: false,
        isFavorite: false,
        sortType: ""
      },
      sortBy: [
        {
          text: "Новинки",
          value: "create_desc"
        },
        {
          text: "Цена возр.",
          value: "price_asc"
        },
        {
          text: "Цена убыв.",
          value: "price_desc"
        },
        {
          text: "Количество заказов",
          value: "total_tranpro_desc"
        },

        {
          text: "Лучший выбор",
          value: "default"
        }
      ],
      items: []
    };
  },

  methods: {
    async search() {
      const { data } = await HttpClient.request({
        method: "GET",
        url: "/aliexpress/search-items",
        params: this.options
      });
      console.log(data);
      this.items = data;
    }
  }
};
</script>

<style scoped></style>
