<template>
  <div class="h-full bg-gray-100 flex justify-center">
    <div v-if="submitted" class="w-full h-full max-w-4xl">
      <div class="w-full flex justify-center mb-10 p-4 space-x-6 mt-20">
        <button
          @click="sortType = 'all'"
          type="button"
          class="border rounded-lg p-2 w-1/4 text-center"
          :class="{ 'shadow-lg': sortType === 'all' }"
        >
          All
        </button>
        <button
          @click="sortType = 'area'"
          type="button"
          class="border rounded-lg p-2 w-1/4 text-center"
          :class="{ 'shadow-lg': sortType === 'area' }"
        >
          Area
        </button>
        <button
          @click="sortType = 'difficulty'"
          type="button"
          class="border rounded-lg p-2 w-1/4 text-center"
          :class="{ 'shadow-lg': sortType === 'difficulty' }"
        >
          Difficulty
        </button>
      </div>
      <div
        v-if="sortType === 'all'"
        class="flex snap-x snap-mandatory w-full overflow-x-auto space-x-4"
      ></div>
      <div
        v-if="sortType === 'difficulty'"
        class="flex snap-x snap-mandatory w-full overflow-x-auto space-x-4"
      >
        <div
          v-for="(diff, i) in towerdata.difficulties"
          :key="`difficulty${i}`"
          class="w-96 snap-center shrink-0"
          style="height: calc(100vh - 250px)"
        >
          <div class="text-xl text-center border rounded-lg w-full mb-3 p-3">
            {{ diff }}
          </div>
          <div class="w-full rounded-lg p-2 space-y-2">
            <div
              v-for="(action, i2) in towerdata.actions.filter(
                (el) => Math.floor(el.studs - 1) === i
              )"
              :key="`action${i2}`"
            >
              <div
                class="w-full rounded-md border group p-1"
                :class="[
                  playerBadges.includes(action.badge)
                    ? 'bg-green-400'
                    : 'bg-inherit',
                ]"
              >
                <div class="group-hover:hidden">
                  {{ action.acronym }}
                </div>
                <div class="hidden group-hover:flex">
                  {{ action.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex snap-x snap-mandatory w-full overflow-x-auto space-x-4"
      >
        <div
          v-for="(area, i) in towerdata.areas"
          :key="`area${i}`"
          class="w-96 snap-center shrink-0"
          style="height: calc(100vh - 250px)"
        >
          <!--top one had overflow-y-auto-->
          <div class="text-xl text-center border rounded-lg w-full mb-3 p-3">
            {{ area.name }}
          </div>
          <div class="w-full rounded-lg p-2 space-y-2">
            <div
              v-for="(action, i2) in towerdata.actions.filter(
                (el) => el.area === area.id
              )"
              :key="`action${i2}`"
            >
              <div
                class="w-full rounded-md border group p-1"
                :class="[
                  playerBadges.includes(action.badge)
                    ? 'bg-green-400'
                    : 'bg-inherit',
                ]"
              >
                <div class="group-hover:hidden">
                  {{ action.acronym }}
                </div>
                <div class="hidden group-hover:flex">
                  {{ action.name }}
                </div>
              </div>
            </div>
          </div>
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
      <div v-if="formError" class="text-red-500 text-sm">
        {{ formError }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
const allBadges: number[] = towerdata.actions.map((el: any) => el.badge);

export default {
  name: "IndexPage",
  data() {
    return {
      username: "",
      formError: "",
      sortType: "area",
      playerBadges: [] as number[],
      submitted: false,
    };
  },
  mounted() {
    const usernameQuery: any = this.$route.query.username;
    if (usernameQuery) {
      this.username = usernameQuery;
      this.submitUsername();
    }
  },
  computed: {
    actions() {
      return towerdata.actions.filter((el) =>
        this.playerBadges.includes(el.badge)
      );
    },
  },
  methods: {
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

      const id = await getIdFromUsername(this.username);
      if (id) {
        console.log(id);
        this.playerBadges = (
          await getBadgeAwardedTimestampts(id, allBadges)
        ).map((el) => el.badgeId);
        this.submitted = true;
        console.log(await getBadgeAwardedTimestampts(id, allBadges));
      } else {
        this.formError = "User does not exist";
      }
    },
  },
};
</script>
