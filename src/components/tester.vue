<template>
  <div>
    <!-- <img
      :id="id"
      class="shiptzoMove drag"
      :draggable="draggable"
      @dragstart="dragStart"
      @dragover.stop
      src="../assets/all in one.jpg"
    />

    <slot /> -->
  </div>
</template>

<script>
// export default {
//   name: "tester",
//   props: ["id", "draggable"],
//   methods: {
//     dragStart: e => {
//       const target = e.target;
//       console.log(target.id);

//       e.dataTransfer.setData("ship_id", target.id);

//       setTimeout(() => {
//         target.style.display = "none";
//       }, 1);
//     }
//   },
//   created() {
//     console.log(this.id);
//   }
// };
</script>

<style>
</style>