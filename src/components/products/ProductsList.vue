<template>
  <List :headers="headers" :route="route" :title="title"></List>
</template>

<script>
import List from "../common/List";

export default {
  name: "ProductsList",
  components: {
    List
  },
  data() {
    return {
      route: "products",
      title: "Товары",
      headers: [
        {
          text: "Наименование",
          align: "start",
          value: "name"
        },

        {
          text: "Бренд",
          align: "start",
          value: "brand.name"
        },

        {
          text: "Категория",
          align: "start",
          value: "category.name"
        },
        { value: "actions", align: "end", sortable: false }
      ]
    };
  }
};
</script>

<style scoped></style>
