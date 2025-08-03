# JToH XL Project Tower Tracker

Shows your JToH XL Project tower completions.
Uses Nuxt 3, Tailwind CSS and TypeScript.
If there are any issues, contact me on Discord.

[Website Link](https://qaptivator.github.io/jtoh-xl-tower-tracker/)
[JToH XL Project Game Link](https://www.roblox.com/games/13218032675/)

***NOTE: this project is likely scrapped. mostly because towerstats.com copied exactly what i did but added other fangames and gave unknown fangames a way to make their own checkers (i could have also done that). im a bit mad that i wasted so much time on this project for it to be devalued that quickly. also, JToH was renamed to EToH now, but im very lazy to rename it everywhere, so yeah. also, i wont keep on updating the tower list, it requires too manual labour for a thing nobody will ever need again. although i did have a lot of fun making this, and thanks to all nice people who tested this website as i was making it.***

## Update Log

### v0.1.0

Initial release (deployment 3, commit first public release)

- Shows every JXP tower that Roblox user had completed
- Sorting by area (r1, r2, r3, fr) or difficulty
- Percentage of how close is the area or difficulty to fully completion
- Total tower completition percentage
- Hardest completion and most recent completion

### v0.1.1

Tower data hotfix (deployment 4, commit tower data hotfix)

- Fixed the CoTC and CoIS difficulty
- Made the ToFM have the same badge as ToLW, because there isn't a badge for ToFM

### v0.1.2

Ring 4 towers (deployment 5-6, commit ring 4 update)

- Added new citadels from Ring 4

### v0.1.3

Small visual changes (deployment 7, commit small visual changes)

- Added text what is shown when user have never joined JXP even once (useful for showing a possibility that username spelling is wrong)
- Fixed the catastrophic text being barely visible by adding a black stroke around it
- Added an error message, when error occurs while obtaining Roblox data
- Fixed the favicon.ico

### v0.1.4

Zone 1 towers (deployment 8, commit zone 1 updates)

- Added new zone 1 citadels

## TODO List

These are arranged in order of importance/usefulness

- [ ] Replace "area" index with a name or id reference to the area, so that towers wont be tied by the index of the area in the array
- [ ] Dark mode (i tried making it several times but it just doesn't want to work)
- [ ] Button for showing full name without having to hover over the acronyms
- [ ] Show locked/unlocked citadels and areas
- [ ] Menu for uncompleted towers
- [ ] Showing the tower's completion date somewhere
- [ ] Maybe combine all these things into a single filter menu? (like sort by name, difficulty, locked/unlocked, date of completion, ascending/descending)
- [x] Indicator for checking did user even join JXP at all (could be useful for showing that the username is wrong)
- [ ] FAQ page
- [ ] Text for showing current version + centralized version variable
- [ ] Improve the page routing (instead of using a single page and a query for username, have two different pages: one with input and other one with dynamic routing (turns out it's not really possible on static websites (with nuxt generate))
- [ ] Maybe highlight obelisks or mini towers in some way
