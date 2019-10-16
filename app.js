<script>
var data_attr_ar = [];
 $(document).ready(function() {
 
//------------------ code for removing data-attr except f colmn--------------------------------------------------------------------------------------
                 setTimeout(function(){
                var _User="namesel";
                var f_id = "selectboxf";
                  for(let i =4;i <=lastRowCount; i++){
                    //console.log(f_id+i);
                    (function(i){
                       console.log(f_id+i);
                       data_attr_ar.push(f_id+i);
                       //document.getElementById("selectboxf"+i).setAttribute("data-namesel",(_User+i));
                      $("#selectboxf"+i).attr("data-namesel",(_User+i));
                     // document.getElementById("#f4").setAttribute("data-namesel",(_User+i)); 
                    })(i);
                    
                  }
               
               },20000);
   });
   
//-----------------------------------------------------------------------------------------------------------------------------------------------------

 var data1 = [
               [1,"amit",55],
               [2,"joy",56],
               [3,"like",57]
               
               ];
              
               var obj1 = {};
               var color = "";
               var list;
               var lastColName;
               var bugIndex;
               var BugHeader;
               var cmtHeader;
               var cmtIndex;

               var ColsNames = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK"];
var _userName = "";                                                       //--------------------------------------------------- FOR DYNAMIC NAME
                 google.script.run.withSuccessHandler(function(response){ 
                 list = response;
                 bugIndex = list.lang_list.indexOf("BUG-ID");
                 BugHeader = ColsNames[bugIndex];
                 cmtIndex = list.lang_list.indexOf("CMT-ID");
                 cmtHeader = ColsNames[cmtIndex];
                 console.log("BugHeader . " + BugHeader);
                 lastColName = list.lang_list[list.lang_list.length];
                 lastRowCount = list.lastRowCount;                       //--------------------------------------------------- FOR DYNAMIC NAME
                 
                 console.log(" lastRowCount : " + lastRowCount);
                 console.log("lastColName is : " + lastColName);
                }).getCol1();
                document.addEventListener("DOMContentLoaded",function(){
          
                });
             
//.............................. fetching current user email id................................................................................................		
              		
               var currentUser = google.script.run.withSuccessHandler(function(response){		
                		
                  _userName = response;		
                  _userName = _userName.split("@")[0];
                 		
                   console.log(_userName);		
                   		
                   		
                   		
              }).getCurrentUser();		
            		
//------------------------------END OF FETCHING CURRENT USER EMAIL ID--------------------------------------------------------------------------------------------
              function savSelect1(event){ 
               var _textValue=event.target.value; 
               switch(_textValue)
               {
                case "Pass": color = "green";
                event.target.style.backgroundColor="green";
                break;
                case "Planned": color = "#f8f6f7";
                event.target.style.backgroundColor="#f8f6f7";
                break;
                case "Resolved": color = "#ff9900";
                event.target.style.backgroundColor="#ff9900";
                break;
                case "In Progress": color = "yellow";
                event.target.style.backgroundColor="yellow";
                break;
                case "NA": color = "#A9A9A9";
                event.target.style.backgroundColor="#A9A9A9";
                break;
                case "Fail": color = "red";
                event.target.style.backgroundColor="red";
                break;
                 case "On Hold": color = "#63b8ff";
                event.target.style.backgroundColor="#63b8ff";
                default:
                break;
               
               }
               console.log( "-----"+ _userName) ;
            
               obj1 = {
               val: event.target.value,
               name1: event.target.name,
               id: event.target.id,
               selectedIndex: event.target.selectedIndex,
             //  name_data_attr: document.getElementById(event.target.id).getAttribute("data-namesel"),
               currentUserName: _userName                                                               // --------------------------TO GET DATA ATTRIBUTE
               
               }
   //--------------------------------------------------- FOR DYNAMIC NAME------------------------------------------------------------------------------------------------------------            
               
               if(data_attr_ar.indexOf(obj1.id) != -1){
                  obj1.name_data_attr =  document.getElementById(event.target.id).getAttribute("data-namesel"); // --------------------------TO GET DATA ATTRIBUTE
                  google.script.run.withSuccessHandler().getSavedMetaData1(obj1);      
               }
               else{
                   google.script.run.withSuccessHandler().getSavedMetaData1({                                  // saving meta data in separate trix
                                                       val: event.target.value,
                                                       name1: event.target.name,
                                                       id: event.target.id,
                                                       selectedIndex: event.target.selectedIndex,
                                                       currentUserName: _userName                              // --------------------------TO GET DATA ATTRIBUTE
                                                                                                      
                                                     });
               }
               
                console.log("data attr " + obj1.name_data_attr);
                google.script.run.withSuccessHandler().getSavedData1(obj1);
               
   //--------------- --------------------------TO GET DATA ATTRIBUTE ---------------------------------------------------------------------------------------------------------------                           
                       setTimeout(function(){   console.log("okie data attr.." + obj1.name_data_attr + "-----"+ _userName) ;                         
                       document.getElementById(obj1.name_data_attr).value = _userName;
                     },1000);  
   //--------------- --------------------------END TO GET DATA ATTRIBUTE ------------------------------------------------------------------------------------------                           
                 }
               
                //...................................Save Bug Id..........
                   function saveBugData(event){ 
                   event.preventDefault();
                   var bugInputId = event.target[0].id;
                   var _bugInputVal = event.target[0].value;                                                    console.dir(event);
                   console.log("input id " + bugInputId);
                   console.log("input vl " + _bugInputVal);
                   var _id = bugInputId.split("_")[1];
                   var bugObj = { name1: event.target[0].name }  
                   var nam =event.target[0].name;
                   console.log("input  " +event.target[0].name);
                      
                   bugObj.val =  _bugInputVal;
                   
                   console.log(bugObj);
                   google.script.run.withSuccessHandler().getSavedData1(bugObj);
                   google.script.run.withSuccessHandler().getSavedMetaData1({                               // saving BUG meta data only in separate trix
                                                       val: _bugInputVal, // previously _bugId
                                                       name1: event.target[0].name,
                                                       id:bugInputId
                                                   });
                 
                 }
                //................................End of...Save Bug Id..........
                
            //............................................SAVE COMMENT id..........
                   function saveCmtData(event){ 
                   event.preventDefault();
                   var cmtInputId = event.target[0].id;
                   var _cmtInputVal = event.target[0].value;                                                    console.dir(event);
                   console.log("input id " + cmtInputId);
                   console.log("input vl " + _cmtInputVal);
                   var _id = cmtInputId.split("_")[1];
                   var cmtObj = { name1: event.target[0].name }  
                   var nam =event.target[0].name;
                   console.log("input  " +event.target[0].name);
                      
                   cmtObj.val =  _cmtInputVal;
                   
                   console.log(cmtObj);
                   google.script.run.withSuccessHandler().getSavedData1(cmtObj);
                   google.script.run.withSuccessHandler().getSavedMetaData1({                               // saving comment meta data only in separate trix
                                                       val: _cmtInputVal, // previously _cmtId
                                                       name1: event.target[0].name,
                                                       id:cmtInputId
                                                   });
                 
                 }
                //................................End of..COMMENT id..........
                  
               var bug_counter=2;
               var cmt_counter=2;

               async function generateTable1(dataArray){ 

               var count=1;                    //----------------------------------- CHANGE THE COUNT FOR DATA ATTRIBUTE---------------------------
               
               var counter=1;
               var data_attr_counter = 1;
               var col3counter = 1;
               var counternew=0;
               var tbody1 = document.getElementById("table-body1");
                console.log("async");
               await dataArray.forEach(function(r){ 
               //  counter++;
                 counternew++;
              
                var row = document.createElement("tr");
                row.setAttribute('class', 'label');
                var col1 = document.createElement("td");
                col1.setAttribute('class', 'long');
                col1.setAttribute("style","background: #fff;color:#000000");
                col1.textContent = r[0];
                if(col1.textContent == "S.NO") {
                col1.setAttribute('id',"s_id");
                }
              
               var col2 = document.createElement("td");
               col2.setAttribute('class', 'long1 col2Width');
                
               col2.width = "800px !important";
                
               col2.textContent = r[1];
                
               if(col2.textContent == "Logical Checkpoints") {
                           col2.setAttribute('id',"Logical_id");
                           col2.style.background = "#9fc5e8";
                }
                 if(col2.textContent == "Add campaign specific test cases") {
                           col2.setAttribute('id',"spe_id");
                }
                if(col2.textContent == "Change Request") {
                           col2.setAttribute('id',"Change_id");
                           col2.style.background = "#9fc5e8";
                }
                if(col2.textContent == "Formatting Checkpoints") 
                {
                           col2.setAttribute('id',"Format_id");
                           col2.style.background = "#9fc5e8";
                }
                if(col2.textContent == "Data Checkpoints") {
                           col2.setAttribute('id',"Data_id");
                           col2.style.background = "#9fc5e8";
                }
                if(col2.textContent == "QA Checkpoints") {
                           col2.setAttribute('id',"Diff_id");
                           col2.style.background = "#ffffff";
                           col2.style.color = "#ffffff";

                }
                if(col2.textContent == "Gamma Checkpoints")  {
                           col2.setAttribute('id',"Gamma_id");
                           col2.style.background = "#9fc5e8";
                }
                if(col2.textContent == "Other Checkpoints")  {
                           col2.setAttribute('id',"Other_id");
                           col2.style.background = "#9fc5e8";
                }
                if(col2.textContent == "Links Checkpoints")  {
                           col2.setAttribute('id',"Link_id");
                           col2.style.background = "#9fc5e8";
                }
                if(col2.textContent == "Spelling/Typo Checkpoints")  {
                           col2.setAttribute('id',"Spel_id");
                           col2.style.background = "#9fc5e8";
                }
                if(col2.textContent == "Graphics Checkpoints")  {
                           col2.setAttribute('id',"Graphics_id");
                           col2.style.background = "#9fc5e8";
                }
                if(col2.textContent == "Regression Checkpoints")  {
                           col2.setAttribute('id',"Regression_id");
                           col2.style.background = "#9fc5e8";
                }
              
                var col3 = document.createElement("td");
                count++;
                col3counter++;
                
             /*    --------------VALID CODE TO CREATE DYNAMIC DROPDOWN--------------
             
             col3.innerHTML = "<select name=c" +col3counter+" onChange='savSelect1(event)' class='checkselectemail'id= namesel" +count+">" + (function() 
                   { var str ='';
                     var list; google.script.run.withSuccessHandler(function(response){ 
                     list = response; console.log("response " + list + " type " + Array.isArray(list)); 
                     console.log("data "+ list); 
                     for(var i=0;i<list.length;i++){ 
                        str += '<option>' +list[i]+ '</option>'; console.log("str "+ str); 
                       }
                    
                       var cls_list = document.getElementsByClassName("checkselectemail"); for(var i = 0; i< cls_list.length; i++){ cls_list[i].innerHTML = '<option>Select Name</option>'+str;}
                       }).optiondata();  
                       })()  + "</select>";
                       
              */
                  col3.innerHTML = "<input type = '' name=c" +col3counter+" class='checkselectemail'id= namesel" +count+">";     
                       
                  
                // ...........for bug column................
                
                var bug = document.createElement("td");  
                console.log("BugHeader . " + BugHeader);
                
             
                bug.innerHTML = "<form id='bugForm' name='bugF' action = '' onsubmit= 'saveBugData(event)' >" + "<input type = 'text' name="+BugHeader+bug_counter+" class='bugs' value='' id="+BugHeader+"_" +bug_counter+ ">" + "<input type = 'submit' value='save'>" + "</form>";
               
                ++bug_counter;
                
                var cmt = document.createElement("td");  
                console.log("cmtHeader . " + cmtHeader);
                 
                cmt.innerHTML = "<form id='cmtForm' name='cmtF' action = '' onsubmit= 'saveCmtData(event)' >" + "<input type = 'text' name="+cmtHeader+cmt_counter+" class='cmts' value='' id="+cmtHeader+"_" +cmt_counter+ ">" + "<input type = 'submit' value='save'>" + "</form>";
               
                ++cmt_counter;

             
                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col3);
                row.appendChild(bug);
                row.appendChild(cmt);


//-------------------------------------------------SERIES OF CHARACTER GENERATOR THAT MATCHES WITH THE SHEET CLOUMN NAME IN ORDER--------------------------------------
                setTimeout(function(){
               
                class StringIdGenerator {
  constructor(chars = 'abcdefghijklmnopqrstuvwxyz') {
    this._chars = chars;
    this._nextId = [0];
  }

  next() {
    const r = [];
    for (const char of this._nextId) {
      r.unshift(this._chars[char]);
    }
    this._increment();
    return r.join('');
  }

  _increment() {
    for (let i = 0; i < this._nextId.length; i++) {
      const val = ++this._nextId[i];
      if (val >= this._chars.length) {
        this._nextId[i] = 0;
      } else {
        return;
      }
    }
    this._nextId.push(0);
  }

  *[Symbol.iterator]() {
    while (true) {
      yield this.next();
    }
  }
}

//---------------------------------------END-------------------------------

         const ids = new StringIdGenerator(); const bids = new StringIdGenerator(); bids.next();bids.next();bids.next();bids.next();bids.next();
         var cid = ids.next();ids.next();ids.next();ids.next();ids.next(); // SKIPPING FIRST 3 COLUMNS..
                 
            (function(counter,data_counter){
                var _id_User=" namesel";
             
                console.log("list.lastColCount" + list.lastColCount)
                for(let i=1; i<=list.lastColCount-5; i++){
                    (function(i){ 
                     var colTd = document.createElement("td"); 
                     if(cid == 'a'){
                       colTd.innerHTML = "<select name="+ids.next()+counter+ " class='checkselect1' id= selectbox"+bids.next()+counter+" onchange = 'savSelect1(event)'><option>Planned</option><option>Pass</option><option>Fail</option><option>NA</option><option>On Hold</option><option>Resolved</option><option>In Progress</option></select>";
                     }
                     else if(cid == 'b'){
                     var nextChar = cid; nextChar = 'e';
                       colTd.innerHTML = "<select name="+ids.next()+counter+ " class='checkselect1' id= selectbox"+bids.next()+counter+" onchange = 'savSelect1(event)'><option>Planned</option><option>Pass</option><option>Fail</option><option>NA</option><option>On Hold</option><option>Resolved</option><option>In Progress</option></select>";
                     
                     }
                     else if(cid == 'c'){
                     var nextChar = cid; nextChar = 'f';
                       colTd.innerHTML = "<select name="+ ids.next()+counter+ " class='checkselect1' id= selectbox"+bids.next()+counter+" onchange = 'savSelect1(event)'><option>Planned</option><option>Pass</option><option>Fail</option><option>NA</option><option>On Hold</option><option>Resolved</option><option>In Progress</option></select>";
                     
                     }
                     else{
                       colTd.innerHTML = "<select name="+ ids.next()+counter+ " class='checkselect1' id= selectbox"+bids.next()+counter+" onchange = 'savSelect1(event)'><option>Planned</option><option>Pass</option><option>Fail</option><option>NA</option><option>On Hold</option><option>Resolved</option><option>In Progress</option></select>";

                       }
                  row.appendChild(colTd);
                   })(i);
                }
                   
                })(++counter,++data_attr_counter);
                $("td#Logical_id, #Format_id, #Data_id, #Diff_id, #Regression_id, #Graphics_id, #Spel_id, #Other_id, #Link_id, #Gamma_id, #Change_id, #spe_id").nextAll().css("display","none");  

               },10000);
                tbody1.appendChild(row);
                 // code for removing data-attr except f colmn
                
               //-----------------------------------.----------------------
                $("#rowhide1, #rowhide2, #rowhide3,#rowhide4,#rowhide5").css({"display":"none"});
                
                var td2 =  document.getElementsByClassName('col2Width');
                
                for(let i=0; i< td2.length; i++){
                   var cs_w = window.getComputedStyle(td2[i], null).getPropertyValue("width"); console.log(cs_w);
                   document.getElementsByClassName('col2Width')[i].style.width = cs_w +200;
                    console.log(document.getElementsByClassName('col2Width')[i].style.width);
                }
               

                });
               }
               
               //-----------------DISPLAYING THE UPDATED SHEET DATA ON UI----------------------------------------------------------
                
                var global_sheet_obj  = {};
                var global_arr  = [];
                var global_Item_arr  = [];
                var tempItemObj = {};
                 google.script.run.withSuccessHandler(function(res) { 
                 
                     var temp = res;
                     console.log("fsdfsdf " +temp);
                     setTimeout(function(){
                     
                     
                     temp.forEach( function(element, index, array){
                        
                            var temp_arr  = [];
                            
                            temp_arr = element.map(function(item) { return item;})
                            
                            global_arr = [...global_arr, ...temp_arr];

                     }) 
                     
                     global_arr.forEach(function(item){
                             console.log(item);
                                      if(item !=="" && !item.includes("D_") && !item.includes("E_")){
                                        global_Item_arr = item.split(","); 
                                        console.log(" global item" + global_Item_arr.length);
                                        if(global_Item_arr.length == 6){ //console.log(" global_Item_arr " + global_Item_arr[5]);
                                         console.log("len 6");
                                        tempItemObj = { id: global_Item_arr[2], indx: global_Item_arr[3], value: global_Item_arr[0], data_attr: global_Item_arr[5] };
                                        document.getElementById(tempItemObj.data_attr).value = global_Item_arr[4];
                                        }
                                       if(global_Item_arr.length == 5){
                                        console.log("len 5");
                                            tempItemObj = {id: global_Item_arr[2], indx: global_Item_arr[3], value: global_Item_arr[0] };
                                        }
                                        
                                      //  document.getElementById(tempItemObj.data_attr).value = _userName;
                                         console.log(" global_Item_id " +tempItemObj.indx);
                                               var selct  = document.getElementById(tempItemObj.id);
                                               selct.children[tempItemObj.indx].setAttribute("selected", "selected");
                                               document.getElementById(tempItemObj.id).style.color = "black";
                                               switch(tempItemObj.value){
                                                 case "Pass": document.getElementById(tempItemObj.id).style.background = "green"; break;
                                                 case "Planned": document.getElementById(tempItemObj.id).style.background = "#f8f6f7";break;
                                                 case "Resolved": document.getElementById(tempItemObj.id).style.background = "#ff9900";break;
                                                 case "NA": document.getElementById(tempItemObj.id).style.background = "#A9A9A9";break;
                                                 case "Fail": document.getElementById(tempItemObj.id).style.background = "red";break;
                                                 case "On Hold": document.getElementById(tempItemObj.id).style.background = "#63b8ff";break;
                                                 case "In Progress": document.getElementById(tempItemObj.id).style.background = "yellow";break;
                                               }
                                           
                                      }
                                   //-----------------------.............-------------Displaing bugs back to Interface......
                                   
                                      if(item.includes("D_")){ 
                                         var b_id =  item.split(",")[2];
                                         console.log(b_id);
                                         document.getElementById(b_id).setAttribute("value",item.split(",")[0]); 
                                         document.getElementById(b_id).style.color = "red";
                                        document.getElementById(b_id).style.fontWeight="bold";


                                    }
                                    if(item.includes("E_")){ 
                                         var b_id =  item.split(",")[2];
                                         console.log(b_id);
                                         document.getElementById(b_id).setAttribute("value",item.split(",")[0]); 
                                         document.getElementById(b_id).style.color = "#006400";
                                          document.getElementById(b_id).style.fontWeight="bold";

                

                                    }
                                    
                            })
                     
             
                      },20000);                             
                    
                 }).getTableData1Sheet();
               
 </script>
               

