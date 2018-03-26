import React from "react";

const Form = () => {
  function createParticle(options) {
    let o = options || {};
    particles.push({
      x: o.x, // particle position in the `x` axis
      y: o.y, // particle position in the `y` axis
      vx: o.vx, // in every update (animation frame) the particle will be translated this amount of pixels in `x` axis
      vy: o.vy, // in every update (animation frame) the particle will be translated this amount of pixels in `y` axis
      life: 0, // in every update (animation frame) the life will increase
      death: o.death || Math.random() * 200, // consider the particle dead when the `life` reach this value
      size: o.size || Math.floor(Math.random() * 2 + 1) // size of the particle
    });
  }

  //Loop to redraw particles
  function loop() {
    addIconParticles();
    updateParticles();
    renderParticles();
    iconAnimationFrame();
  }

  function addIconParticles() {
    iconRect = uploadIcon.getBoundingClientRect();
    let i = iconParticlesCount;
    while (i--) {
      createParticle({
        x:
          iconRect.left +
          iconRect.width / 2 +
          rand(iconRect.width - 10), // position the particle along the icon width in the `x` axis
        y: iconRect.top + iconRect.height / 2, // position the particle centered in the `y` axis
        vx: 0, // the particle will not be moved in the `x` axis
        vy: Math.random() * 2 * iconParticlesCount // value to move the particle in the `y` axis, greater is faster
      });
    }
  }

  function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].life > particles[i].death) {
        particles.splice(i, 1);
      } else {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        particles[i].life++;
      }
    }
  }

  //clear canvas
  function renderParticles() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < particles.length; i++) {
      ctx.fillStyle =
        "rgba(255, 255, 255, " +
        (1 - particles[i].life / particles[i].death) +
        ")";
      ctx.fillRect({
        particles[i].x,
        particles[i].y,
        particles[i].size,
        particles[i].size
      );
    }
  }

  //add 100 particles to the icon sans render
  function initIconParticles() {
    var iconParticlesInitialLoop = 100;
    while (iconParticlesInitialLoop--) {
      addIconParticles();
      updateParticles();
    }
  }
  initIconParticles();

  function initIconAnimation() {
    iconAnimation = anime({
      targets: uploadIcon,
      translateY: -10,
      duration: 800,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true,
      autoplay: false
    });
  }
  initIconAnimation();

  function playIconAnimation() {
    if (!playingIconAnimation) {
      playIconAnimation = true;
      iconAnimation.play();
      iconAnimationFrame = requestAnimationFrame(loop);
    }
  }

  function pauseIconAnimation() {
    if (playingIconAnimation) {
      playingIconAnimation = false;
      iconAnimation.pause();
      cancelAnimationFrame(iconAnimationFrame);
  }

  function addParticlesOnDrop(x, y, delay) {
    var i = delay ? 0 : 20; // Only add extra particles for the first item dropped (no `delay`)
    while (i--) {
        createParticle({
            x: x + rand(30),
            y: y + rand(30),
            vx: rand(2),
            vy: rand(2),
            death: 60
        });
}



  return (
    <form
      className="upload"
      method="post"
      action=""
      enctype="multipart/form-data"
      novalidate=""
    >
      <input
        class="upload__input"
        name="files[]"
        type="file"
        multiple=""
      />

      <canvas class="upload__canvas" />

      <div class="upload__icon">
        <svg viewBox="0 0 470 470">
          <path d="m158.7 177.15 62.8-62.8v273.9c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5v-273.9l62.8 62.8c2.6 2.6 6.1 4 9.5 4 3.5 0 6.9-1.3 9.5-4 5.3-5.3 5.3-13.8 0-19.1l-85.8-85.8c-2.5-2.5-6-4-9.5-4-3.6 0-7 1.4-9.5 4l-85.8 85.8c-5.3 5.3-5.3 13.8 0 19.1 5.2 5.2 13.8 5.2 19 0z" />
        </svg>
      </div>
    </form>
  );
};

export default Form;
