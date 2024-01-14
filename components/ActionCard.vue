<template>
  <div
    @mousemove="handleMouseMove"
    class="w-full rounded-md border group p-1 has-tooltip"
    :class="[
      playerBadges.includes(action.badge) ? 'bg-green-100' : 'bg-gray-100',
    ]"
  >
    <span
      ref="mouseTooltip"
      class="tooltip p-1 rounded border border-gray-200 bg-gray-100 shadow-lg text-sm -mt-8 ml-2"
    >
      {{
        `${getDiffPrefix(action.studs)} ${getDiff(action.studs).name} [${
          action.studs
        }]`
      }}
    </span>
    <div
      class="group-hover:hidden font-medium"
      :class="[getDiffColor(action.studs)]"
    >
      {{ action.acronym }}
    </div>
    <div
      class="hidden group-hover:flex font-medium"
      :class="[getDiffColor(action.studs)]"
    >
      {{ action.name }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "ActionCard",
  props: {
    action: {
      type: Object as PropType<Action>,
      required: true,
    },
    playerBadges: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  methods: {
    handleMouseMove(e: any) {
      let tooltip: any = this.$refs.mouseTooltip;
      if (tooltip) {
        tooltip.style.left = e.pageX + "px";
        tooltip.style.top = e.pageY + "px";
      }
    },
  },
};
</script>
<style>
.text-stroke {
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
}
.tooltip {
  @apply invisible absolute;
}
.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>
