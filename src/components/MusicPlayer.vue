<template>
  <div class="music-player">
    <h2>正在播放</h2>
    <transition name="fade">
      <div v-if="url" class="player-container">
        <div class="left-section">
          <div class="album-cover-container">
            <img :src="albumCover" class="album-cover" :class="{ spinning: isPlaying }" />
          </div>
          <audio ref="audio" :src="url" controls autoplay @play="startSpinning" @pause="stopSpinning" @timeupdate="updateLyrics" class="audio-player"></audio>
        </div>
        <div class="right-section">
          <div class="lyrics-container" ref="lyricsContainer">
            <div v-for="(line, index) in formattedLyrics" :key="index" :class="{ active: index === currentLine }" class="lyrics-line">
              <span>{{ line.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'MusicPlayer',
  props: {
    url: {
      type: String,
      required: true
    },
    lyrics: {
      type: String,
      required: true
    },
    albumCover: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPlaying: false,
      currentLine: 0,
      currentLineStack: [] // 添加 currentLineStack 数组
    };
  },
  computed: {
    formattedLyrics() {
      const lines = this.lyrics.split('\n');
      return lines.map(line => {
        if (line.length >= 8) { // 确保 line 长度足够
          let match = line.substring(1, 8);
          if (match) {
            const minutes = parseInt(match.substring(0, 2));
            const seconds = parseInt(match.substring(3, 5));
            const milliseconds = parseInt(match.substring(6));
            const text = line.substring(10) // 修改获取文本的方式
            const time = minutes * 60 + seconds + milliseconds / 100;

            // 添加过滤器，过滤掉不需要的内容
            if (text && text.trim().length > 0) {
              return { time, text };
            }
          }
        }
        return { time: 0, text: '' }; // 返回空文本
      }).filter(item => !isNaN(item.time) && item.text.trim().length > 0); // 使用过滤器过滤掉空文本项
    }
  },
  methods: {
    startSpinning() {
      this.isPlaying = true;
    },
    stopSpinning() {
      this.isPlaying = false;
    },
    updateLyrics() {
      const currentTime = Math.floor(this.$refs.audio.currentTime); // 获取当前播放时间的秒数

      // 获取歌曲总时长


      // 初始化栈
      if (currentTime === 0) {
        this.currentLineStack = [...this.formattedLyrics].reverse();
      }

      // 检查栈是否为空
      if (this.currentLineStack.length > 0) {
        const topLine = this.currentLineStack[this.currentLineStack.length - 1];
        if (currentTime >= topLine.time) {
          this.currentLine = this.formattedLyrics.length - this.currentLineStack.length;
          this.currentLineStack.pop(); // 出栈
        }
      }

      this.scrollLyrics();
    },
    scrollLyrics() {
      const activeLine = this.$refs.lyricsContainer.querySelector('.active');
      if (activeLine) {
        const container = this.$refs.lyricsContainer;
        const offsetTop = activeLine.offsetTop - container.offsetTop - container.clientHeight / 2 + activeLine.clientHeight / 2;
        container.scrollTop = offsetTop;
      }
    }
  },
  watch: {
    lyrics: {
      immediate: true, // 立即执行一次
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          // 歌词变化时滚动
          this.scrollLyrics();
        }
      }
    }
  }
};
</script>
<style scoped>
.music-player {
  text-align: center;
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.player-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px; /* 调整间距 */
  background-color: #f5f5f5;
  padding: 40px; /* 调整内边距 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; /* 占满宽度 */
  height: 90%; /* 占用更大的高度 */
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.album-cover-container {
  margin-bottom: 20px;
}

.album-cover {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  transition: transform 0.5s linear;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.spinning {
  animation: spin 5s linear infinite;
}

.audio-player {
  width: 100%; /* 占满父容器 */
  max-width: 400px;
  margin-top: 10px;
}

.right-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lyrics-container {
  width: 100%; /* 占满父容器 */
  max-height: 450px; /* 限制歌词区域的最大高度 */
  overflow-y: auto;
  background-color: #7fc8a9; /* 修改背景色为蓝绿色调 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.lyrics-line {
  text-align: center;
  white-space: pre-wrap;
  font-size: 36px;
  line-height: 2;
  color: #fff; /* 修改文字颜色为白色 */
  padding: 5px 0;
  transition: color 0.3s ease;
}

.active {
  color: #ff4081;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
