import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { AccordionPreviewComponent } from './shared/ui/accordion';
import { RegisterComponent } from './views/register/register.component';
import { SelectMateriasComponent } from './views/select-materias/select-materias.component';
import { MisMateriasComponent } from './views/mis-materias/mis-materias.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'estudiantes-front';
}
