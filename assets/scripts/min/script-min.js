function color(e,r,o,t){selectedColours=["rgb("+e+","+r+","+o+")","rgb("+e+","+parseInt(r+t)+","+o+")","rgb("+e+","+r+","+parseInt(o+t)+")","rgb("+e+","+parseInt(r+t)+","+parseInt(o+t)+")","rgb("+e+","+parseInt(r+t)+","+parseInt(o+2*t)+")","rgb("+e+","+parseInt(r+2*t)+","+parseInt(o+t)+")","rgb("+e+","+parseInt(r+2*t)+","+parseInt(o+2*t)+")"]}function setColor(e,r,o){$(".titleHeader,.pixel,.tracker").css("background-color","rgb("+e+","+r+","+o+")")}function createGrid(e,r){for(i=0;i<e;i++){var o=document.createElement("div");for(o.className="pixelCol",j=0;j<r;j++){var t=document.createElement("div");t.className="pixel",o.appendChild(t)}document.getElementById("pixelGrid").appendChild(o)}}function colourChange(){$(".pixel").each(function(){Math.floor(10*Math.random())>7&&$(this).css("background-color",selectedColours[Math.floor(7*Math.random())])})}var colours=["#e55","#e56","#e65","#e66","#e76","#e67","#e77"],selectedColours=[];$(document).ready(function(){window.sr=ScrollReveal(),sr.reveal(".description",{duration:700,scale:1,viewFactor:.1}),sr.reveal("h1, h2",{duration:500,scale:1,viewFactor:.1}),sr.reveal(".tile",{duration:200,scale:1,viewFactor:.1}),$(".menuItem").hover(function(){$(this).next(".selection").toggleClass("hover")}),$(".backToTop").on("click",function(){$("html, body").animate({scrollTop:0},"ease")})});