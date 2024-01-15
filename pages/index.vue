<template>
  <div class="h-full flex justify-center">
    <div v-if="submitted" class="w-full h-full max-w-4xl">
      <div class="mt-20 text-center text-xl mb-1">
        {{ `${username}'s Tower Completions` }}
      </div>
      <div class="w-full flex justify-center mb-4 p-4 space-x-6">
        <!--<button
          @click="sortType = 'all'"
          type="button"
          class="border rounded-lg p-2 w-1/4 text-center bg-white"
          :class="{ 'shadow-lg': sortType === 'all' }"
        >
          All
        </button>-->
        <button
          @click="sortType = 'area'"
          type="button"
          class="border rounded-lg p-2 w-1/3 text-center bg-white"
          :class="{ 'shadow-lg': sortType === 'area' }"
        >
          Area
        </button>
        <button
          @click="sortType = 'difficulty'"
          type="button"
          class="border rounded-lg p-2 w-1/3 text-center bg-white"
          :class="{ 'shadow-lg': sortType === 'difficulty' }"
        >
          Difficulty
        </button>
      </div>
      <!--<div
        v-if="sortType === 'all'"
        class="flex snap-x snap-mandatory w-full overflow-x-auto space-x-4"
      ></div>-->
      <ActionsList
        v-if="sortType === 'difficulty'"
        :categories="towerdata.difficulties"
        :actions="getDiffActions"
        :percentage="getDiffPercentage"
        :player-badges="playerBadges"
      />
      <ActionsList
        v-else
        :categories="towerdata.areas"
        :actions="getAreaActions"
        :percentage="getAreaPercentage"
        :player-badges="playerBadges"
      />
      <div
        class="relative w-full rounded-xl p-1 text-center bg-gray-200 mt-3"
        style="height: 32px"
      >
        <div
          class="rounded-lg h-full bg-green-400"
          :style="{
            width: `${getTotalActions().percentage}%`,
          }"
        >
          <span class="absolute block w-full text-black">
            {{ getTotalActions().text }}
          </span>
        </div>
      </div>
      <div class="flex">
        <div
          class="text-center w-full p-2 font-medium"
          :class="[getHardestAction().color]"
        >
          {{ getHardestAction().text }}
        </div>
        <div
          class="text-center w-full p-2 font-medium"
          :class="[getMostRecentAction().color]"
        >
          {{ getMostRecentAction().text }}
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center w-1/2 my-auto">
      <div class="text-center mb-10 text-2xl">
        Check your JToH XL Project tower stats!
      </div>
      <div class="flex mb-2">
        <input
          v-model="username"
          @keyup.enter="submitUsername"
          class="rounded-lg border p-2 mr-2"
          type="text"
          placeholder="Roblox Username"
        />
        <button
          @click="submitUsername"
          class="p-2 w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-450 transition-all text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div v-if="formError" class="text-red-500 text-sm mb-2">
        {{ formError }}
      </div>
      <Loading v-model="loading" class="mt-2" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "IndexPage",
  data() {
    return {
      username: "",
      formError: "",
      sortType: "area",
      mostRecentAction: null as any,
      playerBadges: [] as number[],
      submitted: false,
      loading: false,
    };
  },
  mounted() {
    const usernameQuery: any = this.$route.query.username;
    if (usernameQuery) {
      this.username = usernameQuery;
      this.submitUsername();
    }
  },
  /*computed: {
    actions() {
      return towerdata.actions.sort((a, b) => a.studs - b.studs);
    },
    ownedActions() {
      return towerdata.actions
        //.filter((el) => this.playerBadges.includes(el.badge))
        .filter((el) => this.playerBadges.includes(el.badge))
        .sort((a, b) => a.studs - b.studs); // b-a descending a-b ascending
    },
  },*/
  methods: {
    getPercentage(count: number, total: number) {
      return ((count / total) * 100 || 0).toFixed(1);
    },
    getActions(actions: Action[] = towerdata.actions) {
      return actions.sort((a, b) => a.studs - b.studs);
    },
    getOwnedActions(actions: Action[] = towerdata.actions) {
      return actions
        .filter((el) => this.playerBadges.includes(el.badge))
        .sort((a, b) => a.studs - b.studs);
    },
    getAreaActions(areaId: number) {
      return this.getActions().filter((el) => el.area === areaId);
    },
    getDiffActions(diffId: number) {
      return this.getActions().filter((el) => roundDiff(el.studs) === diffId);
    },
    getAreaPercentage(areaId: number) {
      const _total = this.getAreaActions(areaId);
      const _owned = this.getOwnedActions(_total);
      const _percentage = this.getPercentage(_owned.length, _total.length);

      return {
        text: `${_owned.length}/${_total.length} (${_percentage}%)`,
        percentage: _percentage,
      };

      //return `${_ownedAreaActions.length}/${
      //  _totalAreaActions.length
      //} (${parseFloat(_percentageAreaActions.toString()).toFixed(1)}%)`;
    },
    getDiffPercentage(diffId: number) {
      const _total = this.getDiffActions(diffId);
      const _owned = this.getOwnedActions(_total);
      const _percentage = this.getPercentage(_owned.length, _total.length);

      return {
        text: `${_owned.length}/${_total.length} (${_percentage}%)`,
        percentage: _percentage,
      };
    },
    getTotalActions() {
      const _total = this.getActions();
      const _owned = this.getOwnedActions();
      const _percentage = this.getPercentage(_owned.length, _total.length);

      return {
        text: `Total: ${_owned.length}/${_total.length} (${_percentage}%)`,
        percentage: _percentage,
      };
    },
    getHardestAction() {
      const _owned = this.getOwnedActions();
      if (_owned.length > 0) {
        const _hardest = _owned.reduce((prev, current) =>
          prev.studs > current.studs ? prev : current
        );
        return {
          text: `Hardest Completion: ${_hardest?.acronym || "N/A"}`,
          color: getDiffColor(_hardest?.studs || 0),
        };
      } else {
        return {
          text: "Hardest Completion: N/A",
          color: getDiffColor(0),
        };
      }
    },
    getMostRecentAction() {
      if (this.mostRecentAction) {
        return {
          text: `Most Recent Completition: ${this.mostRecentAction.acronym}`,
          color: getDiffColor(this.mostRecentAction.studs),
        };
      } else {
        return {
          text: "Most Recent Completition: N/A",
          color: getDiffColor(0),
        };
      }
    },
    isActionDone(action: any) {
      return this.playerBadges.includes(action.badge);
    },
    isBlank(str: string): boolean {
      return !str || /^\s*$/.test(str);
    },
    async submitUsername() {
      if (this.isBlank(this.username)) return;

      this.formError = "";
      this.$router.push({
        path: "/",
        query: { username: this.username },
      });

      this.loading = true;
      const id = await getIdFromUsername(this.username);
      if (id) {
        const timestamps = await getBadgeAwardedTimestampts(
          id,
          towerdata.actions.map((el: any) => el.badge)
        );

        if (timestamps.length > 0) {
          const mostRecentBadge = timestamps.reduce((prev, current) =>
            new Date(prev.awardedDate) > new Date(current.awardedDate)
              ? prev
              : current
          ).badgeId;

          this.playerBadges = timestamps.map((el) => el.badgeId);
          this.mostRecentAction = towerdata.actions.filter(
            (el) => el.badge === mostRecentBadge
          )[0];
        }
        this.loading = false;
        this.submitted = true;
      } else {
        this.loading = false;
        this.formError = "User does not exist";
      }
    },
  },
};
</script>
<style>
.area-container {
  @apply flex snap-x snap-mandatory w-full overflow-x-auto space-x-4;
}
.action-container {
  height: calc(100vh - 250px);
  @apply w-80 snap-center shrink-0;
}
</style>
