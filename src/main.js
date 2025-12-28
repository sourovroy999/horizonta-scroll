import gsap from 'gsap';
import './style.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)




const races = document.querySelector(".races");
// console.log('offsetwidth',races.offsetWidth)

function getScrollAmount(){
  let racesScrollWidth=races.scrollWidth;
  return -(racesScrollWidth-window.innerWidth)
}

const tween=gsap.to(races, {
 x:getScrollAmount,
 duration:3,
 ease:'none'  
})

ScrollTrigger.create({
  trigger:'.racesWrapper',
  start:'top 20%',
  end:()=> `+=${getScrollAmount() * -1}`,
  pin:true,
  animation:tween,
  scrub:1,
  invalidateOnRefresh:true,
  markers:true
})


