import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {} from '@types/dhtmlxscheduler';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'weekly-component',
  template: `
  <div class="weeklyViewPage">
  <header>
  <nav class="navbar header-top navbar-expand-md  navbar-dark bg-dark">
		<span class="navbar-toggler-icon leftmenutrigger"></span>
		  <a class="navbar-brand" href="#">
		  <h2>RH</h2>
		  </a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav pl-2 animate side-nav">
				  <div class="sidebar-brand p-3">                
					  <h2>RH</h2>
						  &nbsp;&nbsp;<span class="appName">APP NAME</span>
					  <span class="float-right " id="slide-submenu">
						  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()"><i class="fa fa-close"></i></a>
					  </span>              
				  </div>
				  <li class="nav-item">
						  <a class="nav-link" href="#">Weekly Shedule</a>
				  </li>
				  <li class="nav-item">
						   <a class="nav-link" href="#">Daily Agenda</a>
				  </li>
				  <li class="nav-item">
						   <a class="nav-link" href="#">Walk-in Guest Check-in</a>
				  </li>
				  <li class="nav-item">
						  <a class="nav-link" href="#">Sheduled Appointments</a>
				  </li>
				  <li class="nav-item">
						   <a class="nav-link" href="#">Corporate Events</a>
				  </li>
				  <li class="nav-item">
						   <a class="nav-link" href="#">Reports</a>
				  </li>
				  <li class="nav-item">
						  <a class="nav-link" href="#">My Shedule</a>
				  </li>
				  <li class="nav-item">
						   <a class="nav-link" href="#">Notification</a>
				  </li>
				  <li class="nav-item">
						   <a class="nav-link" href="#">Logout</a>
				  </li>
			  </ul>
			   <ul class="navbar-nav ml-5">
				   <!-- Dropdown -->
					  <li class="nav-item dropdown">
						  <a class="nav-link dropdown-toggle" href="#" id="#" data-toggle="dropdown">
							  <i class="fa fa-map-marker"></i>&nbsp;&nbsp;#123 Melrose
						  </a>
						  <div class="dropdown-menu">
							  <a class="dropdown-item" href="#">Link 1</a>
							  <a class="dropdown-item" href="#">Link 2</a>
							  <a class="dropdown-item" href="#">Link 3</a>
						  </div>
					  </li>

			  </ul>
			  <ul class="navbar-nav ml-md-auto d-md-flex">
					<li class="nav-item">
						 <a class="nav-link" href="#"><i class="fa fa-bell-o"></i>&nbsp;&nbsp;Notification</a>
					</li>
					<li class="nav-item">
						   <a class="nav-link" href="#" id="#" data-toggle="dropdown">
						 <i class="fa fa-user"></i>&nbsp;&nbsp; User Name
					  </a>
					</li>
					<li class="nav-item">
						   <a class=" nav-link" href="#">Logout</a>
					</li>
			  </ul>                   
		</div>
  </nav>
  
</header>
  <div #weekly_scheduler id="weekly_scheduler" class="dhx_cal_container" style='width:100%; height:600px;'>
  <div class="dhx_cal_navline navbar header-top navbar-expand-md  navbar-light bg-light">
  <a class="nav-link " id="calender1">
	  <span class="add-on"><i class="fa fa-calendar fa-2x"></i></span>
  </a>
  <div class="dhx_cal_prev_button"><i class="fa fa-chevron-left ml-2"></i></div>			
  <div class="dhx_cal_date"></div>
  <div class="dhx_cal_next_button"><i class="fa fa-chevron-right ml-2"></i></div>
	   <ul class="navbar-nav ml-md-auto d-md-flex">                        
		  <li class="nav-item dropdown">
			  <a class="nav-link dropdown-toggle" href="#" id="#" data-toggle="dropdown">
				  Filter
			  </a>
			  <div class="dropdown-menu">
				  <a class="dropdown-item" href="#">Filter Item-1</a>
				  <a class="dropdown-item" href="#">Filter Item-2</a>
				  <a class="dropdown-item" href="#">Filter Item-3</a>

			  </div>
		  </li>
		   <li class="nav-item">
			  <a class="nav-link" href="#" id="#" >
				  Expand All <i class="fa fa-long-arrow-down"></i>
			  </a>
		  </li>                       
		  <li class="nav-item">
			  <a class="nav-link" href="#" id="#" >
				  Collapse All <i class="fa fa-long-arrow-up"></i>
			  </a>
		  </li>
	  </ul>
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
		{ start_date: "2017-07-30 00:00", end_date: "2017-07-30 12:00", text:"9AM - 6PM", section_id:20},
		{ start_date: "2017-07-30 12:00", end_date: "2017-07-30 24:00", text:"9AM - 6PM", section_id:20},
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
