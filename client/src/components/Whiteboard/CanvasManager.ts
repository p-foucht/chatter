interface Plot {
  x: number;
  y: number;
}

interface PlotCollection {
  id: string;
  plots: Plot[];
}

class CanvasManager {
  private ctx: CanvasRenderingContext2D | null = null;
  private currentLineId: string | null = null;
  private lines: PlotCollection[] = [];
  private erasedLines: PlotCollection[] = [];
  private plots: Plot[] = [];
  private height: number | null = null;
  private width: number | null = null;
  private MAX_UNDO_COUNT = 5;

  init(ctx: CanvasRenderingContext2D, height: number, width: number) {
    if (!this.ctx) {
      this.ctx = ctx;
    }

    this.height = height;
    this.width = width;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
  }

  startLine(x: number, y: number, id: string) {
    this.currentLineId = id;
    this._startLine(x, y);
  }

  sketchLine(x: number, y: number) {
    this.plots.push({ x, y });
    this._sketchLine(x, y);
  }

  stopLine(): PlotCollection {
    this._stopLine();

    if (this.plots.length) {
      this.lines.push({
        id: this.currentLineId!,
        plots: this.plots,
      });
    }

    this.currentLineId = null;
    this.plots = [];

    return this.lines[this.lines.length - 1];
  }

  drawFullLine(collection: PlotCollection) {
    if (!collection) {
      return;
    }
    const { plots } = collection;

    this.lines.push(collection);
    this._drawPlots(plots);
  }

  clearCanvas() {
    if (!this.width || !this.height) {
      return;
    }

    this.ctx?.clearRect(0, 0, this.width, this.height);
  }

  drawCurrentState() {
    this.clearCanvas();

    this.lines.forEach(({ plots }) => {
      this._drawPlots(plots);
    });
  }

  undo() {
    if (!this.lines.length) {
      console.log('Nothing to undo');
      return;
    }

    const line = this.lines.pop()!;

    if (this.erasedLines.length === this.MAX_UNDO_COUNT) {
      this.erasedLines.shift();
    }

    this.erasedLines.push(line);
    this.drawCurrentState();
  }

  redo() {
    if (!this.erasedLines.length) {
      console.log('Nothing to redo');
      return;
    }

    const line = this.erasedLines.pop()!;
    this.lines.push(line);

    this.drawCurrentState();
  }

  _drawPlots(plots: Plot[]) {
    const { x: initialX, y: initialY } = plots[0];
    this._startLine(initialX, initialY);

    for (let i = 1; i < plots.length; i++) {
      const { x, y } = plots[i];
      this._sketchLine(x, y);
    }

    this._stopLine();
  }

  _startLine(x: number, y: number) {
    this.ctx?.beginPath();
    this.ctx?.moveTo(x, y);
    this.ctx?.stroke();
  }

  _sketchLine(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }

  _stopLine() {
    this.ctx?.closePath();
  }
}

export default CanvasManager;
