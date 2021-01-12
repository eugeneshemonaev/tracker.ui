<template>
  <List :headers="headers" :route="route" :title="title"></List>
</template>

<script>
import List from "../common/List";

export default {
  name: "CategoriesList",
  components: {
    List
  },
  data() {
    return {
      route: "categories",
      title: "Категории",
      headers: [
        {
          text: "Наименование",
          align: "start",
          value: "name"
        },
        { value: "actions", align: "end", sortable: false }
      ]
    };
  }
};
</script>

<style scoped></style>
