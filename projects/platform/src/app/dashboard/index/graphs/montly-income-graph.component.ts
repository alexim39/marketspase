import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { MatCardModule } from '@angular/material/card';
import { IndexService } from '../index.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'async-monthly-income-graph',
  imports: [CommonModule, MatTableModule, CommonModule, MatButtonModule, MatCardModule], 
  providers: [IndexService],
  template: `
    <canvas #barCanvas width="1000"></canvas>
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
export class MonthlyIncomeGraphComponent implements AfterViewInit, OnInit {
  @Input() partner!: PartnerInterface;
  //@Input() monthlyProfits: any;
  subscriptions: Subscription[] = [];

  @ViewChild('barCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  labels: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  data: number[] = Array(12).fill(0); // Default to 12 months with 0 profit

  constructor(
    private indexService: IndexService,
  ) {}

  ngOnInit() {
    //this.subscriptions.push(
      this.indexService.getMonthlyProfits(this.partner._id).subscribe({
        next: (profits: any) => {
          this.labels = profits.labels;
          this.data = profits.data;
        }
      })
   // )
  }



  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.resizeCanvas();
    this.drawChart();
  }

  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const parentWidth = canvas.parentElement?.offsetWidth || window.innerWidth; // Use parent width or fallback to window width
    canvas.width = parentWidth - 40; // Add some padding
    canvas.height = canvas.width * 0.5; // Maintain a 2:1 aspect ratio
    this.drawChart();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeCanvas();
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
    const barWidth = (chartWidth / this.data.length - 20); // Reduce bar width by 30%

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Y-axis lines + labels
    const step = Math.ceil(maxVal / 10); // Dynamically calculate step size
    ctx.font = '14px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let y = 0; y <= maxVal; y += step) {
      const yPos = height - margin - (y / maxVal) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(margin, yPos);
      ctx.lineTo(width - margin + 10, yPos);
      ctx.strokeStyle = '#ccc';
      ctx.stroke();
      ctx.fillText(y.toString(), margin - 10, yPos);
    }

    // X and Y Axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Bars with animation
    let progress = 0;

    const animate = () => {
      // Clear the entire canvas area, including bars, labels, and text
      ctx.clearRect(0, 0, width, height);

      // Redraw the Y-axis lines and labels
      for (let y = 0; y <= maxVal; y += step) {
        const yPos = height - margin - (y / maxVal) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(margin, yPos);
        ctx.lineTo(width - margin + 10, yPos);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
        ctx.fillText(y.toString(), margin - 10, yPos);
      }

      // Redraw the X and Y axes
      ctx.beginPath();
      ctx.moveTo(margin, margin);
      ctx.lineTo(margin, height - margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw the bars with animation
      this.data.forEach((val, i) => {
        const x = margin + i * (barWidth + 20) + 10;
        const fullHeight = (val / maxVal) * chartHeight;
        const animatedHeight = fullHeight * progress;
        const y = height - margin - animatedHeight;

        // Bar
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(x, y, barWidth, animatedHeight);

        // Value label
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.font = '10px Arial';
        ctx.fillText(val.toString(), x + barWidth / 2, y - 10);

        // Label
        ctx.fillText(this.labels[i], x + barWidth / 2, height - margin + 20);
      });

      // Continue the animation until progress reaches 1
      if (progress < 1) {
        progress += 0.02;
        requestAnimationFrame(animate);
      } else {
        progress = 1; // Ensure progress stops at 1

        const now = new Date();
        const currentMonthIndex = now.getMonth();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonthText = monthNames[currentMonthIndex];

        // Draw the chart title after the animation completes
        ctx.textAlign = 'center';
        ctx.font = '18px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(`Daily Income Graph for the month of ${currentMonthText}`, width / 2, margin / 2);      
      }
    };

    animate();
  }
}