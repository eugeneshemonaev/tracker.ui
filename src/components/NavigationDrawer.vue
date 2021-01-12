<template>
  <div>
    <v-navigation-drawer expand-on-hover>
      <v-list nav dense>
        <v-list-item v-for="(item, i) in list" :key="i" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "NavigationDrawer",
  data() {
    return {
      list: [
        { title: "Товары", icon: "mdi-shopping", link: "/products" },
        { title: "Бренды", icon: "mdi-tag-text", link: "/brands" },
        { title: "Категории", icon: "mdi-file-tree", link: "/categories" },
        { title: "Скидки", icon: "mdi-brightness-percent", link: "/discounts" },
        { title: "Магазины", icon: "mdi-store", link: "/stores" }
      ]
    };
  }
};
</script>
