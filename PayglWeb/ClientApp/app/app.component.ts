import { Component } from '@angular/core';

@Component({
  selector: 'main-page',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{title}}!
      </h1>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Paygl';
}
