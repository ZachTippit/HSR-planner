import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollspyNav = (props) => {

    const [scrollTargetIDs, setScrollTargetIDs] = useState(props.scrollTargetIds)
    const [activeNavClass, setActiveNavClass] = useState(props.activeNavClass)
    const [scrollDuration, setScrollDuration] = useState(props.scrollDuration || 1000)
    const [homeDefaultLink, setHomeDefaultLink] = useState('/')
    const [hashID, setHashID] = useState('#')

    useEffect(() => {
        if(props.router && props.router === 'HashRouter'){
            setHomeDefaultLink('#/')
            setHashID('#/#')
        } else {
            setHomeDefaultLink('/')
            setHashID('#')
        }
    }, [props.router])

    const easeInOutQuad = (current_time, start, change, duration) => {
        current_time /= duration / 2;
        if (current_time < 1) return change / 2 * current_time * current_time + start;
        current_time--;
        return -change / 2 * (current_time * (current_time - 2) - 1) + start;
    };

    const scrollTo = (start, to, duration) => {
        let change = to - start,
            currentTime = 0,
            increment = 10;

        let animateScroll = () => {
            currentTime += increment;
            let val = easeInOutQuad(currentTime, start, change, duration);
            window.scrollTo(0, val);
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        animateScroll();
    }

    const getNavLinkElement = (sectionID) => {
        return document.querySelector(`a[href='${hashID}${sectionID}']`);
    }

    const getNavToSectionID = (navHref) => {
        return navHref.includes(hashID) ? navHref.replace(hashID, "") : "";
    }

    useEffect(() => {

        if (document.querySelector(`a[href='${homeDefaultLink}']`)) {
            document.querySelector(`a[href='${homeDefaultLink}']`).addEventListener("click", (event) => {
                event.preventDefault();
                scrollTo(window.pageYOffset, 0, scrollDuration);
                window.location.hash = "";
            });
        }

        document.querySelector("div[data-nav='list']").querySelectorAll("a").forEach((navLink) => {
            navLink.addEventListener("click", (event) => {
                let scrollTargetPosition;
                event.preventDefault();
                let sectionID = getNavToSectionID(navLink.getAttribute("href"));
                if(document.getElementById(sectionID) === null){
                    scrollTargetPosition = 0
                } else{
                    scrollTargetPosition = document.getElementById(sectionID).offsetTop;
                    // console.log(scrollTargetPosition)
                }

                if(scrollTargetPosition === undefined || scrollTargetPosition === 0){
                    scrollTo(window.pageYOffset, 0, scrollDuration);
                    // console.log(scrollTargetPosition)
                } else {
                    // console.log(scrollTargetPosition)
                    scrollTo(window.pageYOffset, scrollTargetPosition, scrollDuration);
                }
                
            });
        })

        window.addEventListener("scroll", scrollSection, true );
    }, [])
        

    useEffect(() => {
        return () => {
            window.removeEventListener("scroll", scrollSection, true );
        }
    }, []) 
    
    const scrollSection = () => {
            let scrollSectionOffsetTop;
            scrollTargetIDs.forEach((sectionID, index) => {
                if(document.getElementById(sectionID) === null){
                    scrollSectionOffsetTop = 0
                    return;
                } else{
                    scrollSectionOffsetTop = document.getElementById(sectionID).offsetTop;
                    if (window.pageYOffset >= scrollSectionOffsetTop && window.pageYOffset < scrollSectionOffsetTop + document.getElementById(sectionID).scrollHeight) {
                        // console.log(sectionID)
                        getNavLinkElement(sectionID).classList.add(activeNavClass);
                        getNavLinkElement(sectionID).parentNode.classList.add(activeNavClass);
                        clearOtherNavLinkActiveStyle(sectionID)
                    } else {
                        getNavLinkElement(sectionID).classList.remove(activeNavClass);
                        getNavLinkElement(sectionID).parentNode.classList.remove(activeNavClass);
                    }
    
                    if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight && index === scrollTargetIDs.length - 1) {
                        getNavLinkElement(sectionID).classList.add(activeNavClass);
                        getNavLinkElement(sectionID).parentNode.classList.add(activeNavClass);
                        clearOtherNavLinkActiveStyle(sectionID);
                    }
                }               
            });
    }
    
    const clearOtherNavLinkActiveStyle = (excludeSectionID) => {
        scrollTargetIDs.forEach((sectionID, index) => {
            if (sectionID !== excludeSectionID) {
                getNavLinkElement(sectionID).classList.remove(activeNavClass);
                getNavLinkElement(sectionID).parentNode.classList.remove(activeNavClass);
            }
        });
    }

    return (
        <div data-nav="list" className={props.className}>
            {props.children}
        </div>
    );
}


export default ScrollspyNav;