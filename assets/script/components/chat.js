// USE STRICT MODE
"use strict";
// SELECTED ELEMENTS
const status = document.querySelector(".quote");
const receive = [...document.querySelectorAll(".receiving")];
const send = [...document.querySelectorAll(".sending")];
const placeholder = document.querySelector(".placeholder");
const send_btn = document.getElementsByClassName("send")[0];
// CONDITIONALS
let start = true;
let showmessage = true;
let r_num = 0;
let s_num = 0;
// ARROW FUNCTIONS
const order = (time, work) => {
    return new Promise((resolve, reject) => {
        if (start) {
            setTimeout(() => {
                resolve( work() );
            }, time);
        }
    })
}

// GETTING RANDOME NUMBER FROM 1 SECOND TO 7SECONDS
// const get_time = () => Math.floor( Math.random() * 7000);
const get_time = (customer, stats, time) => {
    if( customer == "receiver") {
        status.textContent = "typing...";
        setTimeout(() => {
            status.textContent = stats;
        }, time);
    } else if (customer == "user") {
        placeholder.textContent = "typing..."
        setTimeout(() => {
            placeholder.textContent = stats;
        }, time);
    }
    return time;
}
// FOR RECEIVER REUSABLE FUNCTION
const chatbox = (person, num) => {
    person[num].classList.add("show");
    let has_img = person[num].hasChildNodes("img");
    if( has_img ) {
        let elem = person[num].querySelectorAll("img");
        elem.forEach(item => {
            item.style.transform = `translate(0)`;
        })
    }
    num++;
    if(person == receive) {
        r_num = num;
    } else {
        s_num = num;
    }
}

// DISPLAYING 
const display_msg = async () => {
    let initial_stat_r = status.textContent;
    let initial_stat_s = placeholder.textContent;
    try{
        let online = "online";

        await order(get_time("receiver", online, 2000), () => chatbox(receive, r_num));
        await order(get_time("receiver", online, 3000), () => chatbox(receive, r_num));
        await order(get_time("user", initial_stat_s, 10000), () => chatbox(send, s_num));
        await order(get_time("user", initial_stat_s, 15000), () => chatbox(send, s_num));
        await order(get_time("user", initial_stat_s, 1500), () => chatbox(send, s_num));
        await order(get_time("receiver", online, 2500), () => chatbox(receive, r_num));
        await order(get_time("receiver", online, 1000), () => chatbox(receive, r_num));
        await order(get_time("receiver", online, 500), () => chatbox(receive, r_num));
    }
    catch(err) {

    }
    finally {
        let whole_msg = receive.concat(send);
        status.textContent = initial_stat_r;
        setTimeout(() => {
            whole_msg.forEach(item => item.classList.remove("show"))
            r_num = 0, s_num = 0;
            display_msg();
        }, 10000);
    }
}
// EXPORTATION
export { display_msg } // destructuring of an object