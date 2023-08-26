import { gsap } from "gsap";
import SplitType from 'split-type'

const init = () => {
    const tl = gsap.timeline();

    // Animated h1
    gsap.to('.title.animated', {
        opacity: 1
    })

    // line by line title animation. Home h1 only
    let myText = new SplitType('#page-index .title.animated');
    tl.from(myText.lines, {
        y: "100%",
        stagger: 0.1,
        duration: 0.4
    })
    tl.to('#page-index .title.animated', {
        // opacity: 1,
        y: 0,
    })
    tl.to('#page-index .title.animated ~ p', {
        opacity: 1,
        duration: .5 
    })
    tl.to('#page-index .hero-body a.button', {
        opacity: 1,
        top: 0,
        duration: .3,
        delay: -.4
    })
}

export default {
    init
}