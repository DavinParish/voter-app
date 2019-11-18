/*global axios*/
/*global Vue*/

var app = new Vue({
  el: '#admin',
    data: {
    name: "",
    bio: "",
    addName: null,
    candidates: [],
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
    async addCandidate() {
      try {
        const formData = new FormData();
        let r2 = await axios.post('/api/candidates', {
          name: this.name,
          bio: this.bio,
        });
        this.getCandidates();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCandidate(candidate) {
      try {
        console.log("CANDIDATE ID: " + candidate._id);
        let response = axios.delete("/api/candidates/" + candidate._id);
        this.getCandidates();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async IncrementVote(candidate) {
      try {
        let response = await axios.put("/api/candidates/" + candidate._id);
        this.getCandidates();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },


});
