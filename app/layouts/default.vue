<template>
  <header>
    <div
      class="flex w-full flex-row items-center justify-between p-2 text-xl shadow shadow-green-700"
    >
      <NuxtLink class="text-4xl font-bold" href="/">
        <span>シ</span><small class="text-sm">(shi)</small>
      </NuxtLink>
      <NuxtLink class="block text-blue-800 underline" href="/game">
        Game
      </NuxtLink>
    </div>
  </header>

  <main>
    <slot />
  </main>

  <footer class="h-20" />
</template>
