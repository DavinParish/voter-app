var app = new Vue({
  el: '#app',
  data: {
    items: [],
  },
  created() {
    this.getCandidates();
  },
  methods: {
    async getCandidates() {
      try {
        let response = await axios.get("/api/candidates");
        this.candidates = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});