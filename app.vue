<template>
  <div class="h-screen">
    <div class="fixed top-0 right-0 z-40 flex border-b w-full items-center p-2">
      <a href="http://qaptivator.github.io/jtoh-xl-tower-tracker">
        <img src="~/assets/jtohxl-logo.png" class="w-12 h-12 mr-4" />
      </a>
      <div>JToH XL Project Tower Tracker</div>
      <div class="grow" />
      <div @click="toggleDarkmode" class="mr-4 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 hidden dark:block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 dark:hidden"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      </div>

      <a
        href="https://github.com/qaptivator/jtoh-xl-tower-tracker"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="mr-3"
        >
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
      </a>
    </div>
    <NuxtPage />
  </div>
</template>
<script lang="ts">
export default {
  name: "AppPage",
  mounted() {
    this.updateDarkmode();
  },
  computed: {
    darkmode: {
      get() {
        return (
          localStorage.getItem("dark-theme") === "true" ||
          (!("dark-theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
      },
      set(v: any) {
        console.log(v);
        localStorage.setItem("dark-mode", (!!v).toString());
        this.updateDarkmode();
      },
    },
  },
  methods: {
    updateDarkmode() {
      if (this.darkmode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    toggleDarkmode() {
      console.log(this.darkmode, "before");
      this.darkmode = !this.darkmode;
      console.log(this.darkmode, "after");
    },
  },
};
</script>
