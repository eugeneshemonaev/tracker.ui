<template>
  <List :headers="headers" :route="route" :title="title"></List>
</template>

<script>
import List from "../common/List";

export default {
  name: "OffersList",
  components: {
    List
  },
  data() {
    return {
      route: "offers?productId=",
      title: "Предложения",
      headers: [
        {
          text: "Наименование",
          align: "start",
          value: "title"
        },
        {
          text: "Рейтинг",
          align: "start",
          value: "rating"
        },
        {
          text: "Отзывы",
          align: "start",
          value: "reviews"
        },
        {
          text: "Заказы",
          align: "start",
          value: "orders"
        },
        {
          text: "Цена",
          align: "start",
          value: "price"
        },
        {
          text: "Валюта",
          align: "start",
          value: "currency"
        },
        { value: "actions", align: "end", sortable: false }
      ]
    };
  }
};
</script>

<style scoped></style>
