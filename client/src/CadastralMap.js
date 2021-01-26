import * as d3 from "d3";

function zoomed(){
    const {transform} = d3.event;
    d3.select("g").attr("transform", transform);
    d3.select("g").attr("stroke-width", 1 / transform.k);
}
                      

function createMap(height,width,that,polyList){
    let moveX = 0,moveY = 0;
    let mouseX,mouseY;
    let detX = 0,detY = 0;
    let dragFlag = 0;
    let scale = 3 / 4;
    let tmpObj = null;
    let zoom = d3.zoom()
                .scaleExtent([0.3,8])
                .on("zoom",zoomed);
    if(d3.select("svg")){
        d3.select("svg").remove();
    }
    let svg = d3.select("#esSvg").append("svg")
                                 .attr("width",width)
                                 .attr("height",height)
                                 .attr("viewBox",[0,0,width,height])
                                 .attr("style", "outline: 3px solid black;");
    let drag = d3.drag()  
        .on('start', function(){
            mouseX = d3.event.sourceEvent.clientX;
            mouseY = d3.event.sourceEvent.clientY;
        })
        .on('drag', function() { 
            detX = (mouseX - d3.event.sourceEvent.clientX) * (width / 800);
            detY = (mouseY - d3.event.sourceEvent.clientY) * (height / 600);
            dragFlag = 1;
            d3.select(this).attr("viewBox",[moveX+detX,moveY+detY,width,height]);
        })
        .on('end',function() {
            if(dragFlag == 1){
                moveX += detX;
                moveY += detY;
                dragFlag = 0;
            }
        });
    d3.select("svg").call(drag);
    //let zoom1 = d3.zoom()
    d3.select("svg").call(zoom);
        /*.on("wheel",function(d){
            console.log("zoom in")
            if(d3.event.wheelDelta > 0){
                width = width * scale;
                height = height * scale;
            }
            else{
                width = width / scale;
                height = height / scale;
            }
            d3.select(this).attr("viewBox",[moveX,moveY,width,height]);
        });*/

    let g = d3.select("svg").append("g");
    polyList.map((val,k) => {
        createGraph(val.poly,val.id,g);
    })
    g.selectAll("polygon").on("click", function(d) {
        let id = d3.select(this).attr("id");
        if(tmpObj){
            tmpObj.transition().style("fill","white");
        }
        let obj = d3.select(this);
        obj.transition().style("fill","orange");
        tmpObj = obj;
        that.d3CLick(id);
    });
    
}

function createGraph(val,id,g){
    let str = "";
    val.map((d,i) => {
        str += d.x + ',' + d.y + ' ';
    });
    g.append("polygon")
        .attr("points", str)
        .attr("stroke","black")
        .attr("stroke-width",2)
        .style("fill","#FFFFFF")
        .attr("id",id);
}


export default createMap;
