<template>
  <div class="column">
    <h1>Inventory</h1>
    <div class="row item" v-for="item in items" v-bind:key="item.id">
      <img>
      <span :title="item.description">{{item.name}}</span>
    </div>
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
