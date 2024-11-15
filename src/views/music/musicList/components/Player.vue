<template>
  <el-dialog :visible.sync="dialogVisible">
    <div class="content-box">
      <audio ref="audio" :src="audioSrc" @timeupdate="updateLyrics"></audio>
      <i class="el-icon-close" @click="closeDialog"></i>
      <div class="left-column">
        <div class="cover-box">
          <img class="cover" :src="coverSrc" />
        </div>
      </div>
      <div class="right-column">
        <div class="lrc-box">
          <h2>{{ songTitle }}</h2>
          <div class="singer-intro">
            <span>歌手：</span>
            <span>{{ artist }}</span>
          </div>
          <div class="singer-intro">
            <span>专辑：</span>
            <span>{{ album }}</span>
          </div>
          <div class="lrc-scroll-box">
            <div v-if="lyrics.length === 0">暂无歌词</div>
            <div v-else>
              <p v-for="(line, index) in lyrics" :key="index" :class="{ active: index === currentLineIndex }">{{ line.text }}</p>
            </div>
          </div>
        </div>
        <div class="slider-box">
          <el-slider v-model="currentTime" :max="duration" @change="seek"></el-slider>
          <div class="play-button-box">
            <img class="switch-song" src="prev-icon.png" @click="prevSong" />
            <div class="play-button" @click="togglePlay">
              <i v-if="!isPlaying" class="el-icon-video-play"></i>
              <i v-else class="el-icon-video-pause"></i>
            </div>
            <img class="switch-song" src="next-icon.png" @click="nextSong" />
            <div class="volume-bar-box">
              <img class="volume-icon" src="volume-icon.png" />
              <el-slider v-model="volume" class="volume-bar" @change="changeVolume"></el-slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      audioSrc: '',
      coverSrc: '',
      songTitle: '',
      artist: '',
      album: '',
      lyrics: [],
      currentLineIndex: 0,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      volume: 100,
    };
  },
  methods: {
    openDialog(song) {
      this.dialogVisible = true;
      this.audioSrc = song.audioSrc;
      this.coverSrc = song.coverSrc;
      this.songTitle = song.title;
      this.artist = song.artist;
      this.album = song.album;
      this.parseLyrics(song.lyrics);
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$refs.audio.pause();
    },
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    updateLyrics() {
      this.currentTime = this.$refs.audio.currentTime;
      for (let i = 0; i < this.lyrics.length; i++) {
        if (this.currentTime >= this.lyrics[i].time) {
          this.currentLineIndex = i;
        }
      }
    },
    seek(value) {
      this.$refs.audio.currentTime = value;
    },
    changeVolume(value) {
      this.$refs.audio.volume = value / 100;
    },
    parseLyrics(lyricText) {
      this.lyrics = [];
      const lines = lyricText.split('\n');
      for (const line of lines) {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (match) {
          const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
          const text = match[3];
          this.lyrics.push({ time, text });
        }
      }
    },
    prevSong() {
      // Implement previous song logic
    },
    nextSong() {
      // Implement next song logic
    }
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.left-column {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cover-box {
  width: 100%;
  display: flex;
  justify-content: center;
}
.cover {
  width: 100%;
  border-radius: 10px;
}
.right-column {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.lrc-box {
  flex-grow: 1;
  margin-bottom: 20px;
}
.lrc-scroll-box {
  height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}
.lrc-scroll-box p {
  margin: 5px 0;
  transition: color 0.3s;
}
.lrc-scroll-box p.active {
  color: #42b983;
}
.slider-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.play-button-box {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.switch-song {
  width: 30px;
  cursor: pointer;
}
.play-button {
  margin: 0 20px;
  cursor: pointer;
}
.volume-bar-box {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.volume-icon {
  width: 20px;
  margin-right: 10px;
}
.volume-bar {
  width: 100px;
}
</style>
