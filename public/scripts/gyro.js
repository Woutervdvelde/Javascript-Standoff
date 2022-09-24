let sensor = new AbsoluteOrientationSensor({frequency: 60});
const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");

sensor.start();

// sensor.addEventListener("reading", () => {
//     console.log(sensor.quaternion);
// });


document.body.onclick = () => {
    // console.log(sensor.quaternion);
    navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100])
}

// setInterval(() => {
//     console.log(sensor)
//     // x.innerText = sensor.x;
//     // y.innerText = sensor.y;
//     // z.innerText = sensor.z;
// }, 1000)