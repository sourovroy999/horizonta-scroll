import gsap from 'gsap';
import './style.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)


const races = document.querySelector(".races");

function getScrollAmount() {
  let racesScrollWidth = races.scrollWidth;
  return -(racesScrollWidth - window.innerWidth )
}

const tween = gsap.fromTo(races, {

  x: () => window.innerWidth

}, {
  x: getScrollAmount,
  duration: 3,
  ease: 'none'
})

ScrollTrigger.create({
  trigger: '.racesWrapper',
  start: 'top 20%',
  end: () => `+=${getScrollAmount() * -1}`,
  pin: true,
  animation: tween,
  scrub: 1,
  invalidateOnRefresh: true,
  markers: true
})

const sections = gsap.utils.toArray(".races div")
const maps=gsap.utils.toArray('.map')

sections.forEach((section, index) => {

  const map=maps[index]
  const mapsAni=gsap.timeline({paused:true})
  .from(map, {scale:0.5, rotation:-20})
  .to(map, {opacity:1}, 0)

  ScrollTrigger.create({
    trigger: section,
    containerAnimation: tween,
    start: 'left 50%',
    animation: gsap.to(section.querySelector("h2"), { scale: 0.6, }),
    end:'right 50%',
    
    scrub: true,
    markers:true,
    
    // onEnter: () => mapsAni.play(),
    // onLeave:()=> mapsAni.pause(0),
    // onEnterBack: () => mapsAni.play(),
    // onLeaveBack:()=> mapsAni.pause(0),

    // onToggle:(self)=>{
    //   if(self.isActive){
    //     mapsAni.play()
    //   }else{
    //     mapsAni.pause(0)
    //   }

    onToggle:(self)=> {self.isActive? mapsAni.play() : mapsAni.pause(0)
    }



  })
})