<template>
  <div>
    <div>
      <h1>Trophy Room</h1>
    </div>
    <div class='trophy-case'>
      <div class='trophy'>
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>
          Trophy 1
        </span>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <div class='trophy-text'>
          Trophy 2
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <div class='trophy-text'>
          Trophy 3
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <div class='trophy-text'>
          Trophy 4
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <div class='trophy-text'>
          Trophy 5
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <div class='trophy-text'>
          Trophy 6
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <div class='trophy-text'>
          Trophy 7
        </div>
      </div>
      <div class='trophy'>
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <div class='trophy-text'>
          Trophy 8
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