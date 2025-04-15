import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'async-weekly-income-graph',
  imports: [CommonModule, MatTableModule, CommonModule, MatButtonModule, MatCardModule],
  template: `
    <canvas #lineCanvas width="1000"></canvas>
  `,
  styles: [`
    canvas {
      border: 1px solid #ddd;
      display: block;
      margin: 20px auto;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 100%;
    }

    @media (max-width: 768px) {
      canvas {
        margin: 10px auto;
      }
    }

    @media (max-width: 480px) {
      canvas {
        margin: 5px auto;
      }
    }
  `],
})
export class WeeklyIncomeGraphComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() partner!: PartnerInterface;
  @Input() weeklyProfits: any;

  @ViewChild('lineCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  data = [0, 0, 0, 0, 0, 0, 0]; // Default to 7 days with 0 profit

  ngOnInit() {
    if (this.weeklyProfits) {
      this.updateGraphData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weeklyProfits'] && changes['weeklyProfits'].currentValue) {
      //console.log('Updated weeklyProfits:', this.weeklyProfits);
      this.updateGraphData(); // Update the graph data when weeklyProfits changes
      this.drawChart(); // Redraw the chart with the updated data
    }
  }

  private updateGraphData(): void {
    if (this.weeklyProfits) {
      this.labels = this.weeklyProfits.labels || this.labels; // Use provided labels or default
      this.data = this.weeklyProfits.data || this.data; // Use provided data or default
    }
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  drawChart() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;
    const margin = 50;

    const chartHeight = height - 2 * margin;
    const chartWidth = width - 2 * margin;

    const maxVal = Math.max(...this.data);

    // Animation progress
    let progress = 0;

    const animate = () => {
      // Clear the entire canvas
      ctx.clearRect(0, 0, width, height);

      // Draw the title
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000';
      ctx.fillText(`Weekly Income Graph`, width / 2, margin / 2);

      // Draw the Y-axis grid and labels
      const step = Math.ceil(maxVal / 5); // Dynamically calculate step size
      ctx.font = '14px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      for (let y = 0; y <= maxVal; y += step) {
        const yPos = height - margin - (y / maxVal) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(margin, yPos);
        ctx.lineTo(width - margin, yPos);
        ctx.strokeStyle = '#eee';
        ctx.stroke();
        ctx.fillText(y.toString(), margin - 10, yPos);
      }

      // Draw the X and Y axes
      ctx.beginPath();
      ctx.moveTo(margin, margin);
      ctx.lineTo(margin, height - margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw the line graph
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#4CAF50';

      this.data.forEach((val, i) => {
        const x = margin + (i / (this.data.length - 1)) * chartWidth;
        const y = height - margin - ((val * progress) / maxVal) * chartHeight;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw the dots and labels
      this.data.forEach((val, i) => {
        const x = margin + (i / (this.data.length - 1)) * chartWidth;
        const y = height - margin - ((val * progress) / maxVal) * chartHeight;

        // Draw the dot
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#388E3C';
        ctx.fill();

        // Draw the value label
        ctx.fillStyle = '#000';
        ctx.font = '13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(val.toString(), x, y - 10);

        // Draw the X-axis label
        ctx.fillText(this.labels[i], x, height - margin + 20);
      });

      // Continue the animation until progress reaches 1
      if (progress < 1) {
        progress += 0.02;
        requestAnimationFrame(animate);
      }
    };

    // Start the animation
    animate();
  }
}