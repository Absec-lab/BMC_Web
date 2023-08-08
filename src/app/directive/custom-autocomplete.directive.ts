import { Directive, ElementRef, HostListener, Input, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appCustomAutocomplete]'
})
export class CustomAutocompleteDirective implements OnDestroy{
  @Input() customAutocompleteList: string[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private dropdownContainer: HTMLElement | null = null;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = this.el.nativeElement;
    const inputValue = inputElement.value;
    const filteredOptions = this.customAutocompleteList.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    this.showOptionsDropdown(inputElement, filteredOptions);
  }

  //Handle outside click other than dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (this.dropdownContainer && !this.dropdownContainer.contains(clickedElement)) {
      this.hideOptionsDropdown();
    }
  }

  //show Options Dropdown
  private showOptionsDropdown(inputElement: HTMLElement, options: string[]) {
    if (!this.dropdownContainer) {
      this.dropdownContainer = this.renderer.createElement('div');
      this.renderer.addClass(this.dropdownContainer, 'dropdown');
      this.renderer.addClass(this.dropdownContainer, 'autocomplete-dropdown');
      this.renderer.addClass(this.dropdownContainer, 'show');
      this.renderer.appendChild(document.body, this.dropdownContainer);
    } else {
      this.renderer.setProperty(this.dropdownContainer, 'innerHTML', '');
    }

    // Position the dropdown below the input
    const inputRect = inputElement.getBoundingClientRect();
    const inputTop = inputRect.bottom + window.scrollY;
    this.renderer.setStyle(this.dropdownContainer, 'position', 'absolute');
    this.renderer.setStyle(this.dropdownContainer, 'top', `${inputTop}px`);
    this.renderer.setStyle(this.dropdownContainer, 'left', `${inputRect.left}px`);
    this.renderer.setStyle(this.dropdownContainer, 'width', `${inputRect.width}px`);
    this.renderer.setStyle(this.dropdownContainer, 'background-color', 'white');
    this.renderer.setStyle(this.dropdownContainer, 'overflow-y', 'scroll');
    this.renderer.setStyle(this.dropdownContainer, 'max-height', '200px'); // Adjust as needed

    options.slice(0, 10).forEach(option => {
      const optionElement = this.renderer.createElement('a');
      this.renderer.addClass(optionElement, 'dropdown-item');
      this.renderer.addClass(optionElement, 'autocomplete-option');
      this.renderer.setProperty(optionElement, 'href', 'javascript:void(0);');
      this.renderer.appendChild(optionElement, this.renderer.createText(option));
      this.renderer.appendChild(this.dropdownContainer, optionElement);

      // Update the input value
      this.renderer.listen(optionElement, 'click', () => {
        this.el.nativeElement.value = option;
        this.el.nativeElement.dispatchEvent(new Event('input')); // This triggers Angular's change detection
        this.el.nativeElement.dispatchEvent(new Event('blur')); 
        this.hideOptionsDropdown();
      });
    });
  }

  private hideOptionsDropdown() {
    if (this.dropdownContainer) {
      this.renderer.removeChild(document.body, this.dropdownContainer);
      this.dropdownContainer = null;
    }
  }

  ngOnDestroy() {
    this.hideOptionsDropdown();
  }

}