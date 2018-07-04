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
    .dhx_matrix_scell.folder .dhx_scell_level0 .dhx_scell_name {
		color: red !important;
	}
	.fullHeightEvent {
		color: red;
	}
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
		section_autoheight: false,
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
	scheduler.templates.timeline_scale_label = function(key, label, section){
		if(section.level == 0) {
			return section.label;
		}

		console.log(section);
		console.log(label);
		console.log(key);

		var employeeName = section.label.split(" ");
		// return label;
		return  "<div class='custom_scell_name'><span><img class='userProfilePic' height='30' src='data:image/png;base64,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'/></span><span><div class='employeeFirstName'>"+employeeName[0]+"</div><div>"+employeeName[1]+"</div></span></div>";
	};
	
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
