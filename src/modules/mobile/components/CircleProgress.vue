<!-- 页面结构入口 -->
<template>
    <canvas :id="id" :width="canvas_width" :height="canvas_heigth"></canvas>
</template>

<script>
    import {circleProgress} from '../../../lib/circleProgress'
    export default {
        data: function () {
            return {
                canvas_id: 'circle-progress',
                canvas_width: 150,
                canvas_heigth: 150,
            }
        },
        props: ['id', 'options', 'progress'],
        mounted: function () {
            if (this.progress >= 60) {
                this.color = '#51A6FF';
            }
            this.createCanvas();
        },
        watch:{
            progress:'createCanvas',
        },
        methods: {
            createCanvas(){
                if (this.progress >= 60) {
                    this.color = '#51A6FF';
                }
                let options = {
                    id: this.id,
                   /* progress: parseInt(this.progress) || 0, // default: 100*/
                    progress: this.progress || 0, // default: 100
                    duration: 500, // default: 1000
                    color: this.color || '#FEC54F', // default: 'rgb(52, 145, 204)'
                    bgColor: '', // default: 'rgb(230, 230, 230)'
                    textColor: this.color || '#FEC450', // default: 'black'
                    progressWidth: 0.15, // default: 0.25 (r)
                    fontScale: 0.5, // default: 0.4 (r)
                    toFixed: 0  // default: 0
                };
                //生成canvas
                circleProgress(options);
            }
        }
    }

</script>
<style>

</style>