let gyroscope = new Gyroscope({frequency: 60});
const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");

gyroscope.addEventListener('reading', (e) => {
    x.innerText = gyroscope.x;
    y.innerText = gyroscope.y;
    z.innerText = gyroscope.z;
});
gyroscope.start();