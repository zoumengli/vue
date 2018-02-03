<!-- 页面结构入口 -->
<template>
    <div class="page-tabbar">
        <div class="page">
            <div class="message-list">
                <ul class="list-ul" v-for="item in newsList">
                    <li @click="changeStatus(item.receiveMessageId)">
                        <div class="list-item">
                            <div>{{item.messageContent}}</div>
                            <div class="time">{{item.receiveTime}}</div>
                        </div>
                        <span class="list-status f-red">{{item.messageStatusStr}}</span>
                    </li>
                </ul>
                <div class="more" @click="more" style="display: none">
                    点击加载更多
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import turnIcon from '../../../../assets/icon/icon_turn.png';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getUserMessageDetail, editUserMessageStatus} from '../../../../lib/api';
    export default {
        data: function () {
            return {
                loading: false,
                pagination: {
                    items:[],
                    total: 0,
                    per_page: 6,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                turnIcon: '',
                newsList: [],
            }
        },
        mounted: function () {
            this.turnIcon = turnIcon;
            this.$bus.emit('set-title', '消息详情');
            this.getUserMessageDetail();
        },
        methods: {
            //加载更多
            more(){
                this.pagination.per_page+= 6 ;
                this.getUserMessageDetail();
            },

            getUserMessageDetail(){
                /*console.log(this.$route.params.type);*/
                let userId = JSON.parse(sessionStorage.getItem("user"));//获取用户信息
                let params = {
                    limit: this.pagination.per_page, // 页面大小
                    /*offset : (page-1)*this.pagination.per_page, // 页码*/
                    /*orders : '[{"col":"name","direct":"desc"}]',*/
                    userId: userId.id,
                    messageCategoryName: this.$route.params.type
                };
//                let para = {userId: userId.id, messageCategoryName: this.$route.params.type};
                AjaxApi.ajaxGet(getUserMessageDetail, params, (response) => {
                    this.loading = false;
                    this.newsList = response.body.data.rows;
                    if(response.body.status===1){
                        this.newsList = response.body.data.rows;
                        if(response.body.data.total>this.pagination.per_page){
                            //加载更多消失
                            document.getElementsByClassName("more")[0].style.display = "block";
                        }else {
                             document.getElementsByClassName("more")[0].style.display = "none";
                        }
                    }else {
                       /* document.getElementsByClassName("more")[0].style.display = "none";*/
                    }

                });
            },
            changeStatus(id){
                let para = {};
                para.data = JSON.stringify({id: id, status: 1});
                AjaxApi.ajaxPost(editUserMessageStatus, para, (response) => {
                    /* console.log(response.body);*/
                    this.getUserMessageDetail();
                });
            }
        },
        components: {}
    }

</script>
<style lang="less" scoped>
    .list-ul li {
    }

    .message-list {
        .list-turn {
            width: 10%;
            line-height: 80px;
            display: inline-block;
        }
        .time {
            :before {
                content: url(../../../../assets/icon/icon_turn.png)
            }
            color: #51A6FF;
        }
        .time:before {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFSElEQVRoQ+1aTXbaSBD+Coswu0lOMPi9wHZwYD/kBMEnCN6MYWVygjgnCLMCz8b4BMEnCNlDrGzB74FPMM4usSXVvBYIt1qtX8SsxjuMVF1f1df1CyGHv9rl8vnBg/2GwGUwmgwuE6gsi2bwikArECYMWtnPDq7Nk8P7XY+nrAJcpX8+viWgDVAtmxw2GRjZpeJVVjCpAdQGy7JB1hkDbQKeZ1Pc/xYD9wSMLDb+MruHqzQyUwFoXCzeM6OXl+Kqoi4QQn96WvmQFEQiALW/5zXDwWUUVRj8jZjGXCDTJmdl/lk1ZSWEjAMulMnhGhO3CPR7uJJsWlw8TuKNWACvBvM2EX3UWZ0Zd1xA33GMcZLDfIAGy3KhYLXIQY8Iv+m8wczvvnaroyhvRAIQyheILjXCvzNzL054UhpsjNQn4Ff1HYf5JOqcUAARyl/bJaMdFTVEhCo+Wi5FHm3jLol31lHNGhHwJg0ILYAw5eOs4R3cGCyaIHx2PzM+TLuV8zTe0Hqd6Hh2+nKsygkAcC+bQ59lzjPwHURtnQCdYrsAEPLqF7ctMAtvbCklIpTNxpHqzQCAxnB+o0YbDkEfZtVdAXggiPmTkjHMaad6JP/PB6AxWJyD8F5+IClt5HfyACDkvbpY9AqMjz4QCiW3AESGPSDrRqHO9axTaSXlr/ecfIeY+WrWrbbTyvCerw8XY/liq1TaAqgPb/sEPvNeFLy3S0Y5S43i8yTjy7RbaWYFsIlOK1+IlbzgAtg8tJStn4U6UhR6ouKOAFwqKfnI9ULJOBTGdQGoXBMZdtat+MrhNBbM0wNbKg0WKzljewZ2AaiRxyG8+3pa6adRWrnEuXpAf6HZjUgk6GP8tP6RFbDYOEySPSPC6ASEP7zvp51KbM0VZ6xNGb/06VkyXlCQX/xt1qlmbFDW4huDRe4A3NwwnJtyFSvyE6nRJ23q11lufwD8kVLoSuphabPufwrg4rbly86ML1QfzpdyA24V+EhtRuL4qX6vBgWrZLzIkk9UuevGim6echWvqDFcsPxgHhdOlQnG62m3MklrCK13FX3/B5DESgCbVqn4Og8aqd7diwfUcCdAMng061RPdqVRAEBdSdF5XOJNUzRRe9xdQQQuMeNuL2HULRDd8vxxrI5PdgEhOjVNGA0mhzQ9bBQlNuPHSV4gdEk3UEqIC6e2bbvw1gXx47FPRG9lOVkKRjW/uKXEPoo5HeD6YD4KgIiZ+chyQos5XZGUxTpJvKQb1yRtnAI9C9ZFp76hAa9mnephEqXSPpMVhFry+BoaXd+Z1DJpAbgRaj178oXZqCIyaP2nfj2qqd/2nVmUjHvHBWHT2GsTwwZXun5dLvnVsYqpTMPGs07lOE6ZrN/LYTZs/FIfLj4RsB3tuNMSNmpex7iXwVYaQG4U/GH1dLkn1WDLO1Rbx6QcLaYBEPZsIOuu66lAuxs23PVfMOAeRCdJh7u7AtgMdy/VAbNMHe+MvYzXdwFQH87PCBQY6YRFqSwLjrFdMk7yqO19mXa94BBWD8xio0J61hWToFRvdvryahdrS/fuDKBz3R4uLh/FDpx0ywbvYLF9B9C3uXiddhC2KbfFOqmnbvXXDVCypUosgKja3m99NgESjfvEKvCdbs1qOCS2kU2Am3ErW5uLrSRGSQTAU1QMbZncRXdgm5gHlYTVidFP04+kAvDkDbsHsPipQS5APMUtGKMkVpeNlRqA97LIoIUHq00sgERt3cN9IxITM/rOL8Vx1qiWGUAgBD7YTfEzAsFxBsrq9l3sHAgQl37i/hzh2cEkq9Ly2f8C5hWUg7n0H9UAAAAASUVORK5CYII=');
            background-size: 10px 10px;
            width: 10px;
            height: 10px;
            display: inline-block;
            margin-right: 5px;
            content: "";
        }
        .list-item {
            padding-top: 15px;
            line-height: 30px;
            float: left;
            width: 90%;
        }
        .list-status {
            line-height: 80px;
        }
        .page{
            margin-bottom: 0;
            height: calc(100% - 40px);
        }
    }
</style>