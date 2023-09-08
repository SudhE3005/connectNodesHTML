var points= new Array();

document.getElementById("addPoint").addEventListener('click',event=>{
    points.push({
        x:document.getElementById("myForm").elements[0].value,
        y:document.getElementById("myForm").elements[1].value
    })
    renderList();
    event.preventDefault();    
})

function renderList(){
    var ul = document.getElementById("points");
    ul.innerHTML="";
    clearCanvas();
    for(var i=0; i<points.length; i++){
        ul.innerHTML+="<li>"+(i+1)+". x="+points[i].x+" y="+points[i].y+"</li>";
        drawPoints(points[i].x,points[i].y,(i+1));
    }  
}

document.getElementById("clearPoints").addEventListener('click',event=>{
    var p= new Array();
    points=p;
    var ul = document.getElementById("points");
    ul.innerHTML="";
    clearCanvas();
    event.preventDefault();
})

document.getElementById("randomPoints").addEventListener('click',event=>{
    var p= new Array();
    points=p;
    document.getElementById("random").style.display="block";
    var ul = document.getElementById("points");
    ul.innerHTML="";
    for (var i = 0; i < document.getElementById("random").elements[0].value; i++) {
        var xx = Math.floor(Math.random() * 900);
        var yy = Math.floor(Math.random() * 500);
        points.push({
            x: xx,
            y: yy
        })
    }
    renderList();
    event.preventDefault();
})

function drawPoints(x,y,i){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font = "10px Kanit";
    ctx.fillText(i, x, y);
}

function clearCanvas(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

const minHeap = () => {
    const data = [];
    
    const size = () => {
      return data.length;  
    };
    
    const bottomUp = (index) => {
        
        if(size() <= 1) return;
        
        const parenti = Math.floor((index - 1) / 2);
        
        if(data[parenti] !== undefined && data[parenti][0] > data[index][0]){
            [data[parenti], data[index]] = [data[index], data[parenti]];
            bottomUp(parenti);   
        }
    };
    
    const topDown = (index) => {
       
        const n = size();
        
        let smaller = index;
        let lefti = 2*index + 1;
        let righti = lefti + 1;
        
        if(lefti < n && data[lefti][0] < data[smaller][0]){
            smaller = lefti;
        }
        
        if(righti < n && data[righti][0] < data[smaller][0]){
            smaller = righti;
        }
        
        if(index !== smaller){
            [data[index], data[smaller]] = [data[smaller], data[index]];
            topDown(smaller);
        }
    };
    
    const add = (val, index, intex) => {
        data.push([val, index, intex]);
        bottomUp(data.length - 1);
    };
    
    const poll = () => {
        if(size() <= 0) return null;
        
        const min = data[0];
        
        data[0] = data[size() - 1];
        data.pop();
        topDown(0);
        
        return min;
    };
    
    return {
        add,
        poll,
        size,
    }
};

document.getElementById("calcCost").addEventListener('click',event=>{
    document.getElementById("cost").innerHTML=minCostConnectPoints(points)
})

var minCostConnectPoints = function(points) {
    const n = points.length;
    const heap = minHeap();
    const visited = [];
    let nodeIndex = 0;
    heap.add(0, 0,0);
    let cost = 0;
    let used = 0;
    while(used < n){
        const [manhattanDistance, pointIndex,k] = heap.poll();
        if(visited[pointIndex]) continue;
        visited[pointIndex] = true;
        cost += manhattanDistance;
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(points[pointIndex].x, points[pointIndex].y);
        ctx.lineTo(points[k].x, points[k].y);
        ctx.stroke();
        used++;
        console.log(points[pointIndex]);
        console.log(points[k]);
        
        const currentPoint = points[pointIndex];
        for(let i=0; i<n; i++){
            if(nodeIndex === i || visited[i]) continue;

            const point = points[i];
            const manhattanDistance = (
                  Math.abs(currentPoint.x - point.x)**2 + 
                  Math.abs(currentPoint.y - point.y)**2)**0.5;

            heap.add(manhattanDistance, i, pointIndex);
        }
    }
    
    return cost;
};