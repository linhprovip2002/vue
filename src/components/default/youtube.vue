<template>
  <div class="flex flex-col h-screen">
    <div class="flex-grow">
      <iframe
        width="100%"
        height="100%"
        :src="videoUrl"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <div class="bg-gray-900 py-4">
      <div class="flex justify-center space-x-4">
        <button
          class="text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          @click="playVideo"
        >
          Play
        </button>
        <button
          class="text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
          @click="pauseVideo"
        >
          Pause
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "VideoPlayer",
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
  },
  setup() {
    const videoElement = ref(null);

    const playVideo = () => {
      console.log(videoElement.value);
      if (!videoElement.value) {
        videoElement.value.play();
      }
    };

    const pauseVideo = () => {
      if (videoElement.value) {
        videoElement.value.pause();
      }
    };

    return {
      videoElement,
      playVideo,
      pauseVideo,
    };
  },
};
</script>

<style scoped>
/* Add any custom styling you need here */
</style>