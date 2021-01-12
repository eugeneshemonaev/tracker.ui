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
      <v-col cols="12">
        <v-btn @click="cancel">Отмена</v-btn>
        <v-btn @click="save">Сохранить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Item from "../../mixins/Item";

export default {
  name: "Brand",
  mixins: [Item],
  data() {
    return {
      item: {
        id: "",
        name: ""
      }
    };
  }
};
</script>

<style scoped></style>
