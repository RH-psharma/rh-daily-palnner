import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {} from '@types/dhtmlxscheduler';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'weekly-component',
  template: `<div #scheduler_here id="scheduler_here" class="dhx_cal_container" style='width:100%; height:600px;'>
  <div class="dhx_cal_navline">
      <div class="dhx_cal_date"></div>
  </div>
  <div class="dhx_cal_header">
  </div>
  <div class="dhx_cal_data">
  </div>		
</div>
  `,
  styles: [`
   
  `]
})
export class WeeklyComponent implements OnInit {
  @ViewChild('scheduler_here') schedulerContainer: ElementRef;
  constructor() {}

  ngOnInit() {
    let copiedEvent:object = {};
	scheduler.config.details_on_create=true;
	scheduler.config.details_on_dblclick=false;
	// scheduler.config.dblclick_create = true;
	scheduler.config.xml_date="%Y-%m-%d %H:%i";
	
	scheduler.config.show_loading = true;
	scheduler.config.dblclick_create = false;
	
	scheduler.templates.event_class = function(start,end,ev){
		return "fullHeightEvent";
	};

    scheduler.clearAll();
   
	// Copy function
	// scheduler.attachEvent("onDblClick", function(id, e) {
	// 	this.copiedEvent = scheduler.getEvent(id);
	// 	console.log("Event copied successfully.");
	// });

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
		section_autoheight: true,
		name:	"timeline",
		x_unit:	"day",
		x_date:	"%F %d",
		x_step:	1,
		x_size: 7,
		y_unit: elements,
		y_property:	"section_id",
		render: "tree",
		folder_dy:30,
		dy:60
	});
		
		
		

	//===============
	//Data loading
	//===============
	scheduler.config.lightbox.sections=[	
		{name:"description", height:50, map_to:"text", type:"textarea" , focus:true},
		{name:"custom", height:30, type:"timeline", options:null , map_to:"section_id" }, //type should be the same as name of the tab
		{name:"time", height:72, type:"time", map_to:"auto"}
	];
	scheduler.config.readonly = true;
	scheduler.init('scheduler_here',new Date(2017,6,30),"timeline");
	scheduler.parse([
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"Task A-89411", section_id:20},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"Task A-89411", section_id:40},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"Task A-89411", section_id:50},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"Task A-89411", section_id:60},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"Task A-89411", section_id:70},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"Task A-89411", section_id:80},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"Task A-89411", section_id:90},

        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"Task A-89411", section_id:40},
        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"Task A-89411", section_id:50},
        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"Task A-89411", section_id:60},
        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"Task A-89411", section_id:80},
        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"Task A-89411", section_id:90}
	],"json");


	// scheduler.setCurrentView();//redraws scheduler
	// scheduler.addSection( {key:"pm3", label:"James Smith"}, "p1");
	// scheduler.addSection( {key:"s3", label:"Alex White"}, "sales");
	// scheduler.deleteSection("p3");

  }
}
