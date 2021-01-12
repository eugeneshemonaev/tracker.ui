import { HttpClient } from "../common/httpClient";

export default {
  props: ["route"],
  data() {
    return {
      item: {}
    };
  },

  computed: {
    isNew() {
      return !Number(this.$route.params.id);
    }
  },

  async created() {
    if (!this.isNew) {
      this.item = await this.get();
    }
  },

  methods: {
    prepareQuery() {
      return {};
    },

    async get() {
      const { data } = await HttpClient.request({
        method: "GET",
        url: `/${this.route}/${this.$route.params.id}?${this.prepareQuery()}`
      });
      return data;
    },

    async save() {
      if (this.isNew) {
        await this.create();
      } else {
        await this.update();
      }

      this.$router.go(-1);
    },

    async create() {
      const item = Object.assign({}, this.item);
      delete item["id"];

      const { data } = await HttpClient.request({
        method: "POST",
        url: `/${this.route}`,
        data: item
      });

      return data;
    },

    async update() {
      const { data } = await HttpClient.request({
        method: "PUT",
        url: `/${this.route}/${this.$route.params.id}`,
        data: this.item
      });

      return data;
    },

    cancel() {
      this.$router.go(-1);
    }
  }
};
