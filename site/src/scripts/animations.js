import { gsap } from "gsap";
import SplitType from 'split-type'

const init = () => {
    const tl = gsap.timeline();

    // Animated h1
    gsap.to('.title.animated', {
        opacity: 1
    })

    // line by line title animation. Home h1 only
    let heading = new SplitType('#page-index .title.animated');
    tl.from(heading.lines, {
        y: "100%",
        stagger: 0.1,
        duration: 0.4
    })
    tl.to('#page-index .title.animated', {
        opacity: 1,
        y: 0,
    })
    tl.to('#page-index .title.animated ~ p', {
        opacity: 1,
        duration: .5 ,
        delay: -.4
    })
    tl.to('#page-index .hero-body a.button', {
        opacity: 1,
        duration: .3,
        delay: -.4
    })
}

export default {
    init
}