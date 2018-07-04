import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {} from '@types/dhtmlxscheduler';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'demo-component',
  template: `
  <div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:600px;">
	<div class="dhx_cal_navline">
		<div class="dhx_cal_prev_button">&nbsp;</div>
		<div class="dhx_cal_next_button">&nbsp;</div>
		<div class="dhx_cal_today_button"></div>
		<div class="dhx_cal_date"></div>
	</div>
	<div class="dhx_cal_header">
	</div>
	<div class="dhx_cal_data">
	</div>
</div>
  `,
  styles: [`
  .not-draggable{
      cursor:default; 
  }
  
  .not-resizeable .dhx_event_resize {
      display:none; 
  }
  
  `]
})
export class DemoComponent implements OnInit {
    @ViewChild('scheduler_here') schedulerContainer: ElementRef;
    constructor() {}
  
    ngOnInit() {
      scheduler.config.details_on_create=true;
      scheduler.config.details_on_dblclick=true;
      scheduler.config.xml_date="%Y-%m-%d %H:%i";
      
      scheduler.clearAll();
      //===============
      //Configuration
      //===============	
      
      var elements = [ // original hierarhical array to display
        {key:10, label:"Field Leader", open: true, children: [
            {key:20, label:"Elizabeth Taylor"},
            {key:40, label:"John Williams"},
            {key:50, label:"David Miller"},
            {key:60, label:"Linda Brown"},
            {key:70, label:"George Lucas"}
        ]},
        {key:110, label:"Leadership", open:true, children: [
            {key:80, label:"Kate Moss"},
            {key:90, label:"Dian Fossey"}
        ]}
    ];
      
      
      
      scheduler.createTimelineView({
        section_autoheight: false,
        name:	"timeline",
        x_unit:	"minute",
        x_date:	"%H:%i",
        x_step:	30,
        x_size: 24,
        x_start: 16,
        x_length:	48,
        y_unit: elements,
        y_property:	"section_id",
        render: "tree",
        folder_dy:30,
        dy:60
      });
      
      //!!! HERE
      scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
          var event = scheduler.getEvent(id);
          if(mode == "move" && !event.draggable){
             return false; 
          }
          if(mode == "resize" && !event.resizeable){
             return false;
          }
          return true;
      });
      
      scheduler.templates.event_class = function(start, end, event){
        var css = [];
        if(!event.draggable){
          css.push("not-draggable"); 
        }
        if(!event.resizeable){
          css.push("not-resizeable"); 
        }
        return css.join(" ");
      }
      
      //===============
      //Data loading
      //===============
      scheduler.config.lightbox.sections=[	
        {name:"description", height:50, map_to:"text", type:"textarea" , focus:true},
        {name:"custom", height:30, type:"timeline", options:null , map_to:"section_id" }, //type should be the same as name of the tab
        {name:"time", height:72, type:"time", map_to:"auto"}
      ];
      
      scheduler.init('scheduler_here',new Date(2017,5,30),"timeline");
      scheduler.parse([
        { start_date: "2017-06-30 09:00", end_date: "2017-06-30 12:00", draggable:true, resizeable: false, text:"draggable", section_id:20},
        { start_date: "2017-06-30 10:00", end_date: "2017-06-30 16:00", draggable:true, resizeable: false, text:"draggable", section_id:20},
        
        { start_date: "2017-06-30 12:00", end_date: "2017-06-30 20:00", draggable:true, resizeable: false, text:"draggable", section_id:40},
        { start_date: "2017-06-30 14:00", end_date: "2017-06-30 16:00", draggable:false, resizeable: true, text:"extendable/shrinkable", section_id:40},
        
        { start_date: "2017-06-30 14:30", end_date: "2017-06-30 16:45", draggable:false, resizeable: true, text:"extendable/shrinkable", section_id:50},
      
        { start_date: "2017-06-30 12:00", end_date: "2017-06-30 18:00", draggable:false, resizeable: true, text:"extendable/shrinkable", section_id:60}
      ],"json");
    }
  }
