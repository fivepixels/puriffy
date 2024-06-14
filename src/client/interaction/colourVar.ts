type Colour = {
  r: number;
  g: number;
  b: number;
  a: number;
};

class AnimatingColourVar {
  private prevColour: Colour;
  private animatingColour: Colour;
  private nextColour: Colour;

  constructor(defaultColour: Colour) {
    this.prevColour = defaultColour;
    this.animatingColour = defaultColour;
    this.nextColour = defaultColour;
  }

  public set(newColour: Colour) {
    this.nextColour = newColour;
  }

  public animate() {
    this.applyAnimation();
  }

  private applyAnimation() {
    console.log("animating!");

    requestAnimationFrame(this.applyAnimation.bind(this));
  }
}
