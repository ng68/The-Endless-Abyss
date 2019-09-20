<template>
  <div>
    <div>
      <h1>Trophy Room</h1>
    </div>
    <div class='trophy-case'>
      <div class='trophy'>
        <img class='trophy-image' src="{{ trophy[0].title }}">
        <span class='trophy-text'>
          {{ trophy[0].title }}
        </span>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="{{ trophy[1].title }}">
        <div class='trophy-text'>
          {{ trophy[1].title }}
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="{{ trophy[2].title }}">
        <div class='trophy-text'>
          {{ trophy[2].title }}
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="{{ trophy[3].title }}">
        <div class='trophy-text'>
          {{ trophy[3].title }}
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="{{ trophy[4].title }}">
        <div class='trophy-text'>
          {{ trophy[4].title }}
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="{{ trophy[5].title }}">
        <div class='trophy-text'>
          {{ trophy[5].title }}
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="{{ trophy[6].title }}">
        <div class='trophy-text'>
          {{ trophy[6].title }}
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="{{ trophy[7].img }}">
        <div class='trophy-text'>
          {{ trophy[7].title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Trophies'
}
</script>

<style scoped>

.trophy-case {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.trophy {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  background-image: url("../assets/shelf.jpg");
  background-size: 100cw 100ch;
}

.trophy-image {
  height: 200px;
}

.trophy-text {
  font-weight: bold;
}

</style>