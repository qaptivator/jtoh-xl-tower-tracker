<template>
  <div class="flex snap-x snap-mandatory w-full overflow-x-auto space-x-4">
    <div
      v-for="(category, categoryId) in categories"
      :key="`category${categoryId}`"
      class="w-80 snap-center shrink-0"
      style="height: calc(100vh - 320px)"
    >
      <!--top one had overflow-y-auto-->
      <div class="text-xl text-center border rounded-lg w-full p-3 bg-white">
        {{ category.name }}
      </div>
      <div class="w-full rounded-lg p-2 space-y-2">
        <div
          class="relative w-full rounded-xl p-1 text-center bg-gray-200"
          style="height: 32px"
        >
          <div
            class="rounded-lg h-full bg-green-400"
            :style="{
              width: `${percentage(categoryId).percentage}%`,
            }"
          >
            <span class="absolute block w-full text-black">
              {{ percentage(categoryId).text }}
            </span>
          </div>
        </div>
        <div
          v-for="(action, actionId) in actions(categoryId)"
          :key="`action${actionId}`"
        >
          <ActionCard :action="action" :player-badges="playerBadges" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "ActionsList",
  props: {
    categories: {
      type: Array as PropType<any[]>,
      required: true,
    },
    playerBadges: {
      type: Array as PropType<number[]>,
      required: true,
    },
    actions: {
      type: Function,
      required: true,
    },
    percentage: {
      type: Function,
      required: true,
    },
  },
};
</script>
