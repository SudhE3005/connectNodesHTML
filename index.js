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
    ul.innerHTML+="<li>"+points.length+". x="+points[points.length-1].x+" y="+points[points.length-1].y+"</li>";
}

