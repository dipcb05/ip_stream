const details = document.getElementById("form");
const b = document.getElementById("submit");


b.addEventListener("click", (e) => {
    e.preventDefault();
    const ip_address = details.ip_address.value;
    const username = details.username.value;
    const password = details.password.value;
    Stream = require('node-rtsp-stream');
    stream = new Stream({
        streamUrl: 'rtsp://' + username + ':' + password + '@' + ip_address + ':554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
        wsPort: 9999
    });
    location.assign("index.html");
})