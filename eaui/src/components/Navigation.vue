<template>
  <div>
    <ul>
      <li><a @click="onHome">Home</a></li>
      <li><a @click="onTrophies">Trophies</a></li>
      <li><a @click="onLeaderboard">Leaderboard</a></li>
      <li><a @click="onManageAccount">Account</a></li>
      <li><a @click="onLogOut">Log Out</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  methods: Object.assign({
    async onHome() {
      this.$router.push({ name: 'MainMenu' })
    },
    async onTrophies() {
      this.$router.push({ name: 'TrophyRoom' })
    },
    async onLeaderboard() {
      this.$router.push({ name: 'Leaderboard' })
    },
    async onManageAccount() {
      this.$router.push({ name: 'ManageAccount' })
    },
    async onLogOut() {
      localStorage.setItem("username", "")
      this.$router.push({ name: 'Login' })
    },
  })
}

</script>

<style scoped>

div {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

li.router-link-active {
  background-color: #4CAF50;
  color: white;
}

ul { overflow:auto; }
li { float:left; }
li:last-child { float:right; }

</style>
