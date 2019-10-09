<template>
  <div>
    <h2>Inventory</h2>
    <ul class="inventory">
      <li class="row item" v-for="item in items" v-bind:key="item.id">
        <img>
        <span :title="item.description">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        name: "Sword",
        description: "This hits stuff",
      },
      {
        name: "Shield",
        description: "This blocks swords and stuff",
      },
      {
        name: "Potion",
        description: "This heals you",
      },
      {
        name: "Stick",
        description: "It's a stick",
      },
      {
        name: "Paul Bunyan's",
        description: "Where the stuff is good, but not too good, eh?",
      }
    ]
  })
}
</script>

<style scoped>



.inventory {
  text-align: left;
}

ul {
  border-style: solid;
}

li {
  background: darkgrey;
  padding: 3px;
}

li:nth-child(odd) {
  background: silver;
}

</style>