let sensor = new RelativeOrientationSensor({frequency: 60});
const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");

sensor.start();

setInterval(() => {
    console.log(sensor)
    // x.innerText = sensor.x;
    // y.innerText = sensor.y;
    // z.innerText = sensor.z;
}, 1000)