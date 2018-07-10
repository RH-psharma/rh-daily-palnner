import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {} from '@types/dhtmlxscheduler';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'weekly-component',
  template: `
  <div class="weeklyViewPage">
  <div #weekly_scheduler id="weekly_scheduler" class="dhx_cal_container" style='width:100%; height:600px;'>
        <div class="dhx_cal_navline">
            <div class="dhx_cal_date"></div>
        </div>
        <div class="dhx_cal_header">
        </div>
        <div class="dhx_cal_data">
        </div>		
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
  @ViewChild('weekly_scheduler') schedulerContainer: ElementRef;
  constructor() {}

  ngOnInit() {
    let copiedEvent:object = {};
	scheduler.config.details_on_create=true;
	scheduler.config.details_on_dblclick=false;
	// scheduler.config.dblclick_create = true;
	scheduler.config.xml_date="%Y-%m-%d %H:%i";
	
	scheduler.config.show_loading = true;
	scheduler.config.dblclick_create = false;
	
	scheduler.templates.event_bar_text = function(start_date, end_date, event) {
		return "<div class='weeklyEventDesignation'>Senior Designer</div><div class='weeklyEventTiming'>"+event.text+"</div>";
	}
	
	scheduler.templates.event_class = function(start,end,ev){
		return "fullHeightEvent";
	};

    scheduler.clearAll();
   
    var elements = [ // original hierarhical array to display
			{key:10, label:"Field Leader", open: true, children: [
				{key:20, label:"https://semantic-ui.com/images/avatar2/large/matthew.png,Elizabeth,Taylor,40"},
				{key:40, label:"https://semantic-ui.com/images/avatar/large/elliot.jpg,John,Williams,40"},
				{key:50, label:"https://semantic-ui.com/images/avatar2/large/kristy.png,Kristy,Miller,32"},
				{key:60, label:"https://semantic-ui.com/images/avatar2/large/molly.png,Linda,Brown,40"},
				{key:70, label:"https://semantic-ui.com/images/avatar/large/elliot.jpg,George,Luca,40"}
			]},
			{key:110, label:"Leadership", open:true, children: [
				{key:80, label:"https://semantic-ui.com/images/avatar2/large/elyse.png,Kate,Moss,40"},
				{key:90, label:"https://semantic-ui.com/images/avatar2/large/matthew.png,Dian,Fossey,40"}
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

		var employeeName = section.label.split(",");
		// return label;
		return  "<div class='custom_scell_name'><span><img class='userProfilePic' height='30' src='"+employeeName[0]+"'/></span><span><div class='employeeFirstName'>"+employeeName[1]+"</div><div>"+employeeName[2]+"</div></span><div class='weeklyWorkingHours'>40 Hrs</div></div>";
	};
	
	scheduler.config.lightbox.sections=[	
		{name:"description", height:50, map_to:"text", type:"textarea" , focus:true},
		{name:"custom", height:30, type:"timeline", options:null , map_to:"section_id" }, //type should be the same as name of the tab
		{name:"time", height:72, type:"time", map_to:"auto"}
	];
	scheduler.config.readonly = true;
	scheduler.init('weekly_scheduler',new Date(2017,6,30),"timeline");
	scheduler.parse([
		{ start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"9AM - 6PM", section_id:20},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"9AM - 6PM", section_id:40},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"9AM - 6PM", section_id:50},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"9AM - 6PM", section_id:60},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"9AM - 6PM", section_id:70},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"9AM - 6PM", section_id:80},
        { start_date: "2017-07-30 00:00", end_date: "2017-07-30 24:00", text:"9AM - 6PM", section_id:90},

        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"9AM - 6PM", section_id:40},
        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"9AM - 6PM", section_id:50},
        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"9AM - 6PM", section_id:60},
        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"9AM - 6PM", section_id:80},
        { start_date: "2017-08-01 00:00", end_date: "2017-08-01 24:00", text:"9AM - 6PM", section_id:90}
	],"json");

	// scheduler.setCurrentView();//redraws scheduler
	// scheduler.addSection( {key:"pm3", label:"James Smith"}, "p1");
	// scheduler.addSection( {key:"s3", label:"Alex White"}, "sales");
	// scheduler.deleteSection("p3");

  }
}
