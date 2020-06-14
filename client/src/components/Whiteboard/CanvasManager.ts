interface Plot {
  x: number;
  y: number;
}

interface PlotCollection {
  id: string;
  plots: Plot[];
  strokeColor: string;
}

class CanvasManager {
  private ctx: CanvasRenderingContext2D | null = null;
  private currentLineId: string | null = null;
  private lines: PlotCollection[] = [];
  private erasedLines: PlotCollection[] = [];
  private plots: Plot[] = [];
  private height: number | null = null;
  private width: number | null = null;
  private strokeColor: string = 'black';
  private MAX_UNDO_COUNT = 10;

  init(ctx: CanvasRenderingContext2D, height: number, width: number) {
    if (!this.ctx) {
      this.ctx = ctx;
    }

    this.height = height;
    this.width = width;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
  }

  initializeState() {
    this.ctx = null;
    this.currentLineId = null;
    this.lines = [];
    this.erasedLines = [];
    this.plots = [];
    this.height = null;
    this.width = null;
  }

  startLine(x: number, y: number, id: string) {
    this.currentLineId = id;
    this._startLine(x, y, this.strokeColor);
  }

  sketchLine(x: number, y: number) {
    this.plots.push({ x, y });
    this._sketchLine(x, y);
  }

  stopLine() {
    if (!this.plots.length) {
      return;
    }

    this._stopLine();

    this.lines.push({
      id: this.currentLineId!,
      plots: this.plots,
      strokeColor: this.strokeColor,
    });

    this.currentLineId = null;
    this.plots = [];

    return this.lines[this.lines.length - 1];
  }

  drawFullLine(collection: PlotCollection) {
    if (!collection || !collection.plots.length) {
      return;
    }
    const { plots, strokeColor } = collection;

    this.lines.push(collection);
    this._drawPlots(plots, strokeColor);
  }

  clearCanvas() {
    if (!this.width || !this.height) {
      return;
    }

    this.ctx?.clearRect(0, 0, this.width, this.height);
  }

  drawCurrentState() {
    this.clearCanvas();

    this.lines.forEach(({ plots, strokeColor }) => {
      this._drawPlots(plots, strokeColor);
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

    return line;
  }

  redo() {
    if (!this.erasedLines.length) {
      console.log('Nothing to redo');
      return;
    }

    const line = this.erasedLines.pop()!;
    this.lines.push(line);

    this.drawCurrentState();
    return line;
  }

  setStrokeColor(color: string) {
    this.strokeColor = color;

    if (this.ctx) {
      this.ctx.strokeStyle = color;
    }
  }

  deleteLineById(id: string) {
    const index = this.lines.findIndex((plot) => plot.id === id);
    if (index === -1) {
      return null;
    }

    const line = this.lines.splice(index, 1);
    this.drawCurrentState();
    return line;
  }

  _drawPlots(plots: Plot[], strokeColor?: string) {
    if (!plots.length) {
      return;
    }

    const { x: initialX, y: initialY } = plots[0];
    const color = strokeColor || this.strokeColor;
    this._startLine(initialX, initialY, color);

    for (let i = 1; i < plots.length; i++) {
      const { x, y } = plots[i];
      this._sketchLine(x, y);
    }

    this._stopLine();
  }

  _startLine(x: number, y: number, color) {
    if (!this.ctx) {
      return;
    }

    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(x, y);
    this.ctx.stroke();
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
