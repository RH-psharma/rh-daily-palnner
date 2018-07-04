import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {} from '@types/dhtmlxscheduler';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'daily',
  template: `
    <div #scheduler_here id="scheduler_here" class="dhx_cal_container" style='width:100%; height:600px;'>
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
    <div class="copyPasteOverlay"></div>
    <div class="copyOptionContainer">
        <ul>
            <li>
                <a href="javascript:void(0);" title="Copy" class="activityMenuOption" id="copyOption">Copy Activity</a>
            </li>
            <li>
                <a href="javascript:void(0);" title="Edit" class="activityMenuOption" id="editOption">Edit Activity</a>
            </li>
            <li>
                <a href="javascript:void(0);" title="Extend/Shorten" class="activityMenuOption" id="extendShortenOption">Extend/Shorten Activity</a>
            </li>
            <li>
                <a href="javascript:void(0);" title="Move" class="activityMenuOption" id="moveOption">Move Activity</a>
            </li>
            <li>
                <a href="javascript:void(0);" title="Remove" class="activityMenuOption" id="removeOption" >Remove Activity</a>
            </li>
        </ul>
    </div>
  `,
  styles: [`
    .dhx_matrix_scell.item .dhx_scell_name {
        color: yellow;
    }
    .copyOptionContainer, .pasteOptionContainer {
        position: absolute;
        background: #fff;
        border: solid 1px #ccc;
        top: 15px;
        left: 0;
        display: none;
    }
    .copyOptionContainer:after, .pasteOptionContainer:after {
        border-bottom: solid 15px #fff;
        border-left: solid 15px transparent;
        border-right: solid 15px transparent;
        content: "";
        position: absolute;
        top: -14px;
        left: 50%;
        margin-left: -7.5px;
    }
    .copyOptionContainer:before, .pasteOptionContainer:before {
        border-bottom: solid 15px #ccc;
        border-left: solid 15px transparent;
        border-right: solid 15px transparent;
        content: "";
        position: absolute;
        top: -16px;
        left: 50%;
        margin-left: -7.5px;
    }
    .copyOptionContainer ul, .pasteOptionContainer ul {
        margin: 0;
        padding: 0;
    }
    .copyOptionContainer li, .pasteOptionContainer li {
        list-style: none;
    }
    .copyOptionContainer li a, .pasteOptionContainer li a {
        padding: 10px;
        text-decoration: none;
        color: #333;
        float: left;
        font-size: 14px;
        min-width: 70px;
    }
    .copyOptionContainer li a:hover, .pasteOptionContainer li a:hover{
        background: #ccc;
        color: #fff;
    }
    .copyPasteOverlay{
        position: fixed;
        width: 100%;
        height: 100%;
        background: #fff;
        top: 0;
        left: 0;
        opacity: 0;
        display: none;
    }
  `]
})
export class DailyComponent implements OnInit {
    @ViewChild('scheduler_here') schedulerContainer: ElementRef;
    constructor() {}
  
    ngOnInit() {
        let copiedEvent:object = {};

        scheduler.config.details_on_create=true;
        scheduler.config.details_on_dblclick=true;
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.clearAll();

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
            x_size: 30,
            x_start: 12,
            x_length:	48,
            y_unit: elements,
            y_property:	"section_id",
            render: "tree",
            folder_dy:30,
            dy:60
        });

        //following function is being used to disable extend/shorten or draggable functioanlity
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
        //   scheduler.config.readonly = true;
        scheduler.init('scheduler_here',new Date(2017,5,30),"timeline");
        scheduler.parse([
            { start_date: "2017-06-30 09:00", end_date: "2017-06-30 12:00", draggable:false, resizeable: false, text:"Task A-12458", section_id:20},
            { start_date: "2017-06-30 14:00", end_date: "2017-06-30 16:00", draggable:false, resizeable: false,text:"Task A-89411", section_id:20},

            { start_date: "2017-06-30 10:00", end_date: "2017-06-30 14:00", draggable:false, resizeable: false,text:"Task A-64168", section_id:40},
            { start_date: "2017-06-30 16:00", end_date: "2017-06-30 17:00", draggable:false, resizeable: false,text:"Task A-46598", section_id:40},
            
            { start_date: "2017-06-30 12:00", end_date: "2017-06-30 14:00", draggable:false, resizeable: false, text:"Task B-48865", section_id:50},
            { start_date: "2017-06-30 14:00", end_date: "2017-06-30 16:00", draggable:false, resizeable: false, text:"Task B-44864", section_id:50},
            { start_date: "2017-06-30 16:30", end_date: "2017-06-30 18:00", draggable:false, resizeable: false, text:"Task B-46558", section_id:50},
            { start_date: "2017-06-30 18:30", end_date: "2017-06-30 20:00", draggable:false, resizeable: false, text:"Task B-45564", section_id:50},
            
            { start_date: "2017-06-30 08:00", end_date: "2017-06-30 12:00",draggable:false, resizeable: false, text:"Task C-32421", section_id:60},
            { start_date: "2017-06-30 14:30", end_date: "2017-06-30 16:45",draggable:false, resizeable: false, text:"Task C-14244", section_id:60},
            
            { start_date: "2017-06-30 09:00", end_date: "2017-06-30 12:00",draggable:false, resizeable: false, text:"Task D-52688", section_id:80},
            { start_date: "2017-06-30 12:30", end_date: "2017-06-30 16:30",draggable:false, resizeable: false, text:"Task D-46588", section_id:80},
            { start_date: "2017-06-30 12:00", end_date: "2017-06-30 18:00",draggable:false, resizeable: false, text:"Task D-12458", section_id:90}
        ],"json");

        // logic to display menu
        var startTime, endTime, longPressElement, copiedValue, longpress, eventId, copiedEventDetails;

        //for laptop/desktop
        $(document).on('mousedown','.dhx_cal_event_line',function(){
            startTime = new Date().getTime();
        });

        function longPressDetected(e) {
            $('.copyOptionContainer, .copyPasteOverlay').hide();

            endTime = new Date().getTime();
            longpress = (endTime - startTime < 2000) ? false : true;
            longPressElement = '';
            if (longpress) {
                startTime = '';
                endTime = '';

                longPressElement = e;
                eventId = longPressElement.attr('event_id');

                console.log(longPressElement);
                var leftPosition = longPressElement.offset().left;
                var topPosition = longPressElement.offset().top + 20;
            
                $('.copyOptionContainer, .copyPasteOverlay').show();
                $('.copyOptionContainer').css({'left':leftPosition, 'top':topPosition});
                longPressElement = '';
            }
        }
        //display menu on long press for laptop/desktop
        $(document).on('mouseup','.dhx_cal_event_line',function(){
            longPressDetected($(this));
        });

        //for iPad
        $('.dhx_cal_event_line').bind( "touchstart", function(e){
        	startTime = new Date().getTime();
        });

        $('.dhx_cal_event_line').bind( "touchend", function(e){
            longPressDetected($(this));
        });
    
        $('.copyPasteOverlay').on('click', function(){
            $('.copyOptionContainer, .copyPasteOverlay').hide();
        });

        //function to check user has selected which option
        $('.activityMenuOption').on('click', function(){
            $('.copyOptionContainer, .copyPasteOverlay').hide();
            let selectedOption = $(this);

            switch(selectedOption.attr('id')) {
                case "copyOption":
                    copyActivity(eventId);
                    break;
                
                case "editOption":
                    editActivity(eventId);
                    break;

                case "extendShortenOption":
                    extendShortenActivity(eventId);
                    break;

                case "moveOption":
                    moveActivity(eventId);
                    break;

                case "removeOption":
                    removeActivity(eventId);
                    break;
            }
        });

        //copy function
        function copyActivity(eventId) {
            copiedEventDetails = scheduler.getEvent(eventId);
            console.log("Event copied successfully.");
        }

        //Paste functionality
        scheduler.attachEvent("onEmptyClick", function (date, e){
            var startDate = moment(date).format("YYYY-MM-DD HH:MM");
            var endDate = moment(date).add(3, 'hours').format("YYYY-MM-DD HH:MM");
            var sectionDetails = scheduler.getActionData(e);

            //check if an user has clicked on parent row
            var sectionLevel = scheduler.getSection(sectionDetails.section);
            if(sectionLevel.level == 0) {
                console.log("header row");
                return false;
            }

            //check if an event is copied
            if(copiedEventDetails === undefined || Object.keys(copiedEventDetails).length === 0) {
                console.log("Please copy an activity first");
                return false;
            }
            //paste an event
            scheduler.parse([{
                start_date: startDate,
                end_date:   endDate,
                text:   copiedEventDetails.text,
                section_id: sectionDetails.section
            }],"json");

            copiedEventDetails = {}
        });

        //open edit event window 
        function editActivity(eventId) {
            scheduler.showLightbox(eventId);
        }

        //extend/shorten activiy
        function extendShortenActivity(eventId) {
            scheduler.getEvent(eventId).readonly = false;
            scheduler.getEvent(eventId).resizeable = true;
        }

        //move activity
        function moveActivity(eventId) {
            console.log(eventId);
            scheduler.getEvent(eventId).readonly = false;
            scheduler.getEvent(eventId).draggable = true;
        }

        //remove activity
        function removeActivity(eventId) {
            scheduler.deleteEvent(eventId);
        }

        //mouse out event to disable shrink/extend or move functionlity
        // $(document).on('mouseout','.dhx_cal_event_line',function(){
        //     var mouseOutElement = $(this);
        //     eventId = mouseOutElement.attr('event_id');
        //     scheduler.getEvent(eventId).readonly = true;
        //     scheduler.getEvent(eventId).resizeable = false;
        //     scheduler.getEvent(eventId).draggable = false;
        // });

        scheduler.attachEvent("onDragEnd", function(id, mode, e){
            scheduler.getEvent(id).readonly = true;
            scheduler.getEvent(id).resizeable = false;
            scheduler.getEvent(id).draggable = false;
        });

    }
}