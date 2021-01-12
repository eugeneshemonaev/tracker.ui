<template>
  <List :headers="headers" :route="route" :title="title"></List>
</template>

<script>
import List from "../common/List";

export default {
  name: "BrandsList",
  components: {
    List
  },
  data() {
    return {
      route: "brands",
      title: "Бренды",
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
