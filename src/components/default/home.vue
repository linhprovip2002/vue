<template>
  <div>
    <VideoPlayer videoUrl="https://www.youtube.com/embed/ep7V5nky0os" />
  </div>
</template>

<script>
import VideoPlayer from "./youtube.vue";

export default {
  name: "HomeComponent",
  components: {
    VideoPlayer,
  },
  setup()
  {
    return {
      VideoPlayer,
    }
  }
};
</script>