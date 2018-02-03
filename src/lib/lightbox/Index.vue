<!-- 参考：https://github.com/pexea12/vue-image-lightbox -->
<template>
<div class="vue-lb-container" v-show="lightBoxOn" v-if="images && images.length > 0">
  <div class="vue-lb-header">
    <span></span>

    <button type="button" 
            title="Close (Esc)" 
            class="vue-lb-button-close" 
            @click="closeLightBox"
    >
      <span>
        <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiPgogIDxnPgogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI4Ljk0MSwzMS43ODZMMC42MTMsNjAuMTE0Yy0wLjc4NywwLjc4Ny0wLjc4NywyLjA2MiwwLDIuODQ5YzAuMzkzLDAuMzk0LDAuOTA5LDAuNTksMS40MjQsMC41OSAgIGMwLjUxNiwwLDEuMDMxLTAuMTk2LDEuNDI0LTAuNTlsMjguNTQxLTI4LjU0MWwyOC41NDEsMjguNTQxYzAuMzk0LDAuMzk0LDAuOTA5LDAuNTksMS40MjQsMC41OWMwLjUxNSwwLDEuMDMxLTAuMTk2LDEuNDI0LTAuNTkgICBjMC43ODctMC43ODcsMC43ODctMi4wNjIsMC0yLjg0OUwzNS4wNjQsMzEuNzg2TDYzLjQxLDMuNDM4YzAuNzg3LTAuNzg3LDAuNzg3LTIuMDYyLDAtMi44NDljLTAuNzg3LTAuNzg2LTIuMDYyLTAuNzg2LTIuODQ4LDAgICBMMzIuMDAzLDI5LjE1TDMuNDQxLDAuNTljLTAuNzg3LTAuNzg2LTIuMDYxLTAuNzg2LTIuODQ4LDBjLTAuNzg3LDAuNzg3LTAuNzg3LDIuMDYyLDAsMi44NDlMMjguOTQxLDMxLjc4NnoiLz4KICA8L2c+Cjwvc3ZnPgo=" />
      </span>
    </button> <!-- .vue-lb-button-close -->

  </div> <!-- .vue-lb-header -->
  <div class="vue-lb-content">
    <div class="vue-lb-figure">
      <img :src="images[select].src" class="vue-lb-modal-image" v-drag-and-drop ref="currImg">

      <div class="vue-lb-info" v-html="images[select].caption" v-if="images[select].caption"></div>

      <div class="vue-lb-footer">
        <div class="vue-lb-footer-info"></div>
        <div class="vue-lb-footer-count">
          {{ select + 1 }}/{{ countImages }}
        </div> <!-- .vue-lb-footer-count -->
      </div> <!-- .vue-lb-footer -->
    </div> <!-- .vue-lb-modal-figure -->
  </div> <!-- .vue-lb-content -->

  <div v-if="showThumbs" class="vue-lb-thumbnail">
    <button type="button" class="vue-lb-thumbnail-arrow vue-lb-thumbnail-left" title="Previous" @click="previousImage">
      <span>
        <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">
          <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"></path>
        </svg>
      </span>
    </button>

    <div 
      v-for="(image, index) in displayThumbs" 
      :key="image.src + index"
      :class="'vue-lb-modal-thumbnail' + (thumbSelect === index ? '-active' : '')" 
      :style="`background-image: url('${ image.thumb }')`"
      @click="showImage(index + beginThumbIndex)"
    >
    </div> <!-- .vue-lb-modal-thumbail -->

    <button type="button" class="vue-lb-thumbnail-arrow vue-lb-thumbnail-right" title="Next" @click="nextImage">
      <span>
        <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">
          <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"></path>
        </svg>
      </span>
    </button>
        <svg data-v-3e7895ba="" aria-hidden="true" class="cus_button set_large svg-icon" v-if="isToLarge == true" @click="handleImgSize"><use data-v-3e7895ba="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-quanping"></use></svg>
        <svg aria-hidden="true" class="cus_button set_large svg-icon" v-if="isToLarge == false" @click="handleImgSize"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-suoping"></use></svg>
  </div> <!-- .vue-lb-thumbnail -->

<!--   <button type="button" class="vue-lb-arrow vue-lb-left" title="Previous" @click="previousImage">
    <span>
      <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">
        <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"></path>
      </svg>
    </span>
  </button>

  <button type="button" class="vue-lb-arrow vue-lb-right" title="Next" @click="nextImage">
    <span>
      <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">
        <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"></path>
      </svg>
    </span>
  </button> -->

</div> <!-- .vue-lb-container -->
</template>
<script>

  import Vue from 'vue';
  Vue.directive('drag-and-drop', {
    bind: function (el, binding, vnode) {
        let mX = 0, mY = 0;//定义鼠标X轴Y轴
        let dX = 0, dY = 0;//定义div左、上位置

        let handleDragStart = function(e){
          mX = event.clientX;
          mY = event.clientY;
          dX = e.target.offsetLeft;
          dY = e.target.offsetTop;
        }
        let handleDragEnter = function(e){
          e.preventDefault();
        }
        let handleDragOver = function(e){
          e.preventDefault();
        }
        let handleDrag = function(e){
          e.preventDefault();
          let top = e.target.offsetTop+document.body.scrollTop;
          let left = e.target.offsetLeft;

          let x = event.clientX;//鼠标滑动时的X轴
          let y = event.clientY;//鼠标滑动时的Y轴
                
          e.target.style.top = (y - mY + dY)+ "px";
          e.target.style.left = ( x - mX + dX)+ "px";

        }
        let handleDragLeave = function(){
            
        }
        let handleDragEnd = function(e){
          //e.stopPropagation();
          e.preventDefault();
          let top = e.clientX;
          let left = e.clientY;

          let x = event.clientX;//鼠标滑动时的X轴
          let y = event.clientY;//鼠标滑动时的Y轴
                
          e.target.style.top = (y - mY + dY)+ "px";
          e.target.style.left = ( x - mX + dX)+ "px";
            
        }
        let handleDrop = function(e){
          e.preventDefault();
        }

        el.addEventListener('dragstart', handleDragStart, false);
        el.addEventListener('dragenter', handleDragEnter, false);
        el.addEventListener('dragover', handleDragOver, false);
        el.addEventListener('drag', handleDrag, false);
        el.addEventListener('dragleave', handleDragLeave, false);
        el.addEventListener('dragend', handleDragEnd, false);
        el.addEventListener('drop', handleDrop, false);
    },
    update: function (newValue, oldValue) {
      
    },
    unbind: function (el) {
      // shut er' down
      el.classList.remove('dragging', 'drag-over', 'drag-enter');
      el.removeAttribute('draggable');
  /*    el.removeEventListener('dragstart', handleDragStart);
      el.removeEventListener('dragenter', handleDragEnter);
      el.removeEventListener('dragover', handleDragOver);
      el.removeEventListener('dragleave', handleDragLeave);
      el.removeEventListener('drag', handleDrag);*/
    }
  });
export default {
  props: {
    /**
     * 数组格式：[{src:'',thumb:'',caption:''}]
     */
    images: {
      type: Array,
      default: [],
      required: true,
    },

    showLightBox: {
      type: Boolean,
      default: false,
    },

    startAt: {
      type: Number,
      default: 0,
    },

    nThumbs: {
      type: Number,
      default: 7,
    },

    showThumbs: {
      type: Boolean,
      default: true,
    },

    // Mode
    autoPlay: {
      type: Boolean, 
      default: false,
    },

    autoPlayTime: {
      type: Number,
      default: 3000,
    },

    fullScreen: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      select: this.startAt,
      thumbSelect: this.startAt,
      lightBoxOn: this.showLightBox,
      countImages: this.images.length,
      displayThumbs: this.images.slice(0, this.nThumbs),
      timer: null,

      beginThumbIndex: 0,
      isToLarge: true,
      style_currImg: {
        top: 0,
        left: 0
      }
    }
  },
  mounted() {
    if(!this.images.length){
      this.images = [{src:'',thumb:'',caption:''}];
    }
    if (document !== undefined) {
      document.onkeydown = (event) => {
        if (event.keyCode === 37) this.previousImage();
        if (event.keyCode === 39) this.nextImage();
        if (event.keyCode === 27) this.closeLightBox();
      }
    }

    if (this.autoPlay) {
      this.timer = setInterval(() => {
        this.nextImage();
      }, this.autoPlayTime)
    }
  },
  watch: {
    images(newVal,oldVal){
      this.countImages = newVal.length;
      if(newVal.length > 0){
        this.displayThumbs = newVal.slice(0, this.nThumbs);
      }
    },
    select() {
      let halfDown = Math.floor(this.nThumbs / 2)
      let mod = 1 - (this.nThumbs % 2)

      if (this.select <= halfDown) {
        this.$set(this, 'beginThumbIndex', 0)
        this.$set(this, 'thumbSelect', this.select)
        this.$set(this, 'displayThumbs', this.images.slice(0, this.nThumbs))
        return
      }

      if (this.select >= this.countImages - halfDown) {
        this.$set(this, 'beginThumbIndex', this.countImages - this.nThumbs)
        this.$set(this, 'thumbSelect', this.nThumbs - (this.countImages - this.select))
        this.$set(this, 'displayThumbs', this.images.slice(-this.nThumbs))
        return
      }

      this.$set(this, 'beginThumbIndex', this.select - halfDown + mod)
      this.$set(this, 'thumbSelect', halfDown - mod)
      this.$set(this, 'displayThumbs', this.images.slice(this.select - halfDown + mod, this.select + halfDown + 1))

      this.setImgPosition();
    }
  },

  methods: {
    handleImgSize() {
      this.isToLarge = !this.isToLarge;
      if(this.isToLarge) { // 缩小操作
        this.setImgPosition(false);
      } else { // 放大操作
        this.setImgPosition(true);
      }
    },
    /**
     * 外部调用方法触发当前图片展示
     * this.$refs.lightbox.showImage(i);//这里的lightbox为调用当前组件时定义的ref属性
     */
    showImage(curr_index) {
      console.log("curr_index:",curr_index);
      //this.beginThumbIndex = curr_index;
      this.$set(this, 'lightBoxOn', true);
      this.$set(this, 'select', curr_index);
      this.isToLarge = true;
      this.setImgPosition();
    },

    closeLightBox() {
      this.$set(this, 'lightBoxOn', false);
      this.isToLarge == true;
    },

    nextImage() {
      this.isToLarge = true;
      this.$set(this, 'select', (this.select + 1) % this.countImages);
    },

    previousImage() {
      this.isToLarge = true;
      this.$set(this, 'select', ((this.select - 1) + this.countImages) % this.countImages);
    },

    setImgPosition(is_zoom){
      this.$nextTick(() => {//等待图片加载后再执行此方法
        let image = new Image();
        image.src = this.$refs.currImg.src;
        let imgW = image.width;
        let imgH = image.height;
        image = null;
        const bodyW = document.body.clientWidth;
        const bodyH = window.innerHeight;
        const bodyW_valid = is_zoom?bodyW:bodyW * 0.8;  //实际屏幕可用宽度(放大时为正常宽度)
        const bodyW_invalid = is_zoom?0:bodyW * 0.2;  //屏幕留白宽度(放大时为没有留白)
        let top = (bodyH - imgH)/2;
        let left = (bodyW - imgW)/2;

        if(top <= 0 && left <=0) { // 图片宽和高都超过浏览器宽高
          imgH = imgH * ( bodyW_valid / imgW );//根据实际屏幕宽度计算图片缩小的高度
          left = bodyW_invalid / 2;
          top = is_zoom?0:(bodyH - imgH) / 2; //如果是放大则top为0
        }else if(left <= 0) {
          imgH = imgH * ( bodyW_valid / imgW );
          top = (bodyH - imgH) / 2;
          left = bodyW_invalid / 2 ;
        }else if(top <= 0) {
          left = (bodyW - imgW) / 2 ;
        }
        if(is_zoom){
          this.$refs.currImg.style.maxWidth = 'none';
        }else{
          this.$refs.currImg.style.width = 'none';
          this.$refs.currImg.style.height =  'none';
          this.$refs.currImg.style.maxWidth = '80%';
        }
        this.$refs.currImg.style.top = ( top < 0 ? 0 :  top ) + "px";
        this.$refs.currImg.style.left = ( left < 0 ? 0 :left ) + "px";
      })
    }
  }
}
</script>
<style scoped>

.cus_button.set_large {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: absolute;
  right: -70px;
  color: #fff;
  cursor: pointer;
  padding: 10px;
  background: #2F2F2F;
}

.vue-lb-box {
  width: 100%;
}

.vue-lb-container {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0px;
  padding: 10px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 9999;
  -webkit-align-items: center;
  -moz-box-sizing: border-box;
  -webkit-justify-content: center;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
}

.vue-lb-content {
  position: absolute;
  bottom: 2px;
  background: #2F2F2F;
}

.vue-lb-header {
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  height: 40px;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  -webkit-box-pack: justify;

  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 99999;
}

.vue-lb-button-close {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  top: 0px;
  vertical-align: bottom;
  height: 40px;
  margin-right: -10px;
  padding: 10px;
  width: 40px;
  background: #2F2F2F;
}

.vue-lb-figure {
  margin: 0px;
  display: block;
  position: relative;
}

img.vue-lb-modal-image {
  max-width: none;
  position: fixed;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  cursor: move;
  top:0;
  left:25%;
  height: auto;
  margin: 0 auto;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.vue-lb-info {
  visibility: initial;
  position: absolute;
  bottom: 25px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  height: 40px;
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-align: center;
}


.vue-lb-footer {
  box-sizing: border-box;
  color: white;
  cursor: auto;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  left: 0px;
  line-height: 1.3;
  padding-bottom: 5px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 5px;
  -moz-box-sizing: border-box;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  -webkit-box-pack: justify;
}

.vue-lb-footer-info {
  display: block;
  flex: 1 1 0;
  -webkit-flex: 1 1 0;
  -ms-flex: 1 1 0;
}

.vue-lb-footer-count {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85em;
  padding-left: 1em;
}

.vue-lb-thumbnail {
  bottom: 10px;
  height: 60px;
  padding: 5px 50px 0 50px;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  background: #2F2F2F;
  border: 1px solid #FFFFFF;
  border-radius: 25px;
  -moz-border-radius: 25px;
  opacity: 0.7;
}

.vue-lb-modal-thumbnail {
  background-position: center;
  background-size: cover;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px hsla(0,0%,100%,.2);
  cursor: pointer;
  display: inline-block;
  height: 50px;
  margin: 2px;
  overflow: hidden;
  width: 50px;
}

.vue-lb-modal-thumbnail-active {
  background-position: center;
  background-size: cover;
  border-radius: 2px;
  box-shadow: inset 0 0 0 2px #FD7802;
  cursor: pointer;
  display: inline-block;
  height: 50px;
  margin: 2px;
  overflow: hidden;
  width: 50px;
}

.vue-lb-thumbnail-arrow {
  height: 54px;
  width: 40px;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  padding: 10px;
  position: absolute;
  top: 50%;
  -webkit-touch-callout: none;
  user-select: none;
  height: 50px;
  margin-top: -25px;
  width: 30px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.vue-lb-thumbnail-left {
  left: 10px;
}

.vue-lb-thumbnail-right {
  right: 10px;
}

.vue-lb-arrow {
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  padding: 10px;
  position: absolute;
  top: 50%;
  -webkit-touch-callout: none;
  user-select: none;
  height: 120px;
  margin-top: -60px;
  width: 40px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.vue-lb-left {
  left: 10px;
}

.vue-lb-right {
  right: 10px;
}

@media (min-width: 500px) {
  .vue-lb-thumbnail-arrow {
    width: 40px;
  }
}

@media (min-width: 768px) {
  .vue-lb-arrow {
      width: 70px;
  }
}
</style>