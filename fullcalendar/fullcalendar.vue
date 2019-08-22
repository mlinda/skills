<template>
  <my-page title="测试" hasHeader>
    <div slot="content" class="fullcalendarWrap">
      <FullCalendar
          defaultView="timeGridDay"
          ref="fullCalendar"
          :weekends="false"
          :hiddenDays="[1,3]"
          :header="{
        // left: 'prev,next today',
        // center: 'title',
        // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        left:'prev',
        center:'title',
        right: 'today ,next'
          }"
          :visibleRange = "{
          start: '2019-08-22',
      end: '2019-08-25'
      }"
          aspectRatio="0.6"
          slot-duration="00:30"
          :plugins="calendarPlugins"
          :events="calendarEvents"/>
    </div>
    <!--          :button-text="{-->
    <!--        today: '今天',-->
    <!--        prev:'上一天',-->
    <!--        next: '后一天'-->
    <!--      }"-->
    <!--          locale="zn"-->
    <!-- min-time="07:00:00"
     max-time="23:00:00"-->
  </my-page>
</template>

<script>
  /* min-time  max-time  左侧展示得时间范围
  * slot-duration 显示时隙的频率
  * button-text 头部按钮文字
  * aspectRatio 表格页面整体宽高比
  * weekends 是否显示周六日 默认true  显示
  * hiddenDays  隐藏哪几天  默认[]  可以修改为[1,3]*/
  import FullCalendar from '@fullcalendar/vue'
  import timeGridPlugin from '@fullcalendar/timegrid'

  export default {
    name: 'index',
    components: {
      FullCalendar // make the <FullCalendar> tag available
    },
    data() {
      return {
        calendarPlugins: [timeGridPlugin],
        calendarEvents: [ // initial event data
          {title: 'Meeting', start: '2019-08-21T10:30:00', end: '2019-08-21T12:30:00'},
          {title: 'Meeting2', start: '2019-08-21T11:30:00', end: '2019-08-21T12:20:00'},
        ]
      }
    },
    watch:{

    },
    mounted() {
      this.$nextTick(() => {
        // let calendarApi = this.$refs.fullCalendar.getApi();
        // calendarApi.next();
        console.log(this.$refs.fullCalendar);
        console.log(this.$refs.fullCalendar.visibleRange);
      })
    },
    methods: {
      toggleWeekends() {
        this.calendarWeekends = !this.calendarWeekends // update a property
      },
      gotoPast() {
        let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
        calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
      },
      handleDateClick(arg) {
        if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
          this.calendarEvents.push({ // add new event data
            title: 'New Event',
            start: arg.date,
            allDay: arg.allDay
          })
        }
      },
    }
  }
</script>

<style>
/*安装fullcalendar 插件*/
  /*@import '~@fullcalendar/core/main.css';*/
  /*@import '~@fullcalendar/daygrid/main.css';*/
  /*@import '~@fullcalendar/timegrid/main.css';*/

</style>

