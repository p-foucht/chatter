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

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  }

  startLine(x: number, y: number, id: string) {
    this.currentLineId = id;
    this._startLine(x, y);
  }

  drawLine(x: number, y: number) {
    this.plots.push({ x, y });
    this._drawLine(x, y);
  }

  stopLine() {
    this._stopLine();

    if (this.plots.length) {
      this.lines.push({
        id: this.currentLineId!,
        plots: this.plots,
      });
    }

    this.currentLineId = null;
    this.plots = [];
  }

  clearCanvas() {
    if (!this.width || !this.height) {
      return;
    }

    this.ctx?.clearRect(0, 0, this.width, this.height);
  }

  drawCurrentState() {
    this.clearCanvas();

    for (let lineIdx = 0; lineIdx < this.lines.length; lineIdx++) {
      const { plots } = this.lines[lineIdx];

      // Starting point of line
      const { x: initialX, y: initialY } = plots[0];
      this._startLine(initialX, initialY);

      for (let plotIdx = 1; plotIdx < plots.length; plotIdx++) {
        const { x, y } = plots[plotIdx];
        this._drawLine(x, y);
      }

      this._stopLine();
    }
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

  _startLine(x: number, y: number) {
    this.ctx?.beginPath();
    this.ctx?.moveTo(x, y);
  }

  _drawLine(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }

  _stopLine() {
    this.ctx?.closePath();
  }
}

export default CanvasManager;
