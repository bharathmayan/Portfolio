import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import Typed from 'typed.js';
import AOS from 'aos';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements AfterViewInit {

  mobileMenu = false;
  cursorX = 0;
  cursorY = 0;
  previewImage: string | null = null;
  previewTitle: string = '';

  @ViewChild('typingElement')
  typingElement!: ElementRef;
  activeSection = 'home';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      // TYPED JS
      new Typed(this.typingElement.nativeElement, {

        strings: [
          'Full Stack Developer',
          'Angular & Node.js Developer',
          'Backend API Developer',
          'Node.js Developer',
          'Enterprise Application Developer'
        ],

        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true

      });

      // AOS INIT
      AOS.init({
        duration: 1000,
        once: true
      });

    }
  }


  projects = [
    {
      title: 'SchoolChimes ERP Platform',
      technologies: 'Angular • Node.js • PostgreSQL',
      description: `
  Developed and maintained the SchoolChimes platform, a communication system
  connecting teachers, parents, and school management. Built responsive user
  interfaces, implemented backend APIs, optimized PostgreSQL queries, and
  resolved application issues including crashes, navigation glitches, data
  inconsistencies, and UI-related problems, significantly improving system
  stability and user experience.
  `
    },
    {
      title: 'SchoolChimes Mobile App Migration',
      technologies: ' Node.js  • PostgreSQL',
      description: `
  Played a key role in the migration and modernization of the SchoolChimes
   mobile application, collaborating with a cross-functional team 
   to transition the platform from v10 to v20.12.2. As the lead backend contributor,
    I optimized database operations and integrated Node.js services to ensure high system reliability,
     improved performance, and a seamless user experience throughout the migration process..
  `
    }
  ];

  toggleMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  // CUSTOM CURSOR
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    this.cursorX = event.clientX;
    this.cursorY = event.clientY;

  }

  openWhatsapp() {

    const message =
      'Hi Bharath, I visited your portfolio and would like to communicate with you.';

    window.open(
      `https://wa.me/919345443519?text=${encodeURIComponent(message)}`,
      '_blank'
    );

  }

  sendWhatsapp(form: any) {

    const name = form.value.name;
    const email = form.value.email;
    const message = form.value.message;

    const whatsappMessage =
      `Hello Bharath,

Name: ${name}
Email: ${email}

Message:
${message}`;

    const phoneNumber = '919345443519';

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    );

  }

  @HostListener('window:scroll', [])
  onScroll() {

    const sections = [
      'home',
      'about',
      'skills',
      'projects',
      'achievements',
      'contact'
    ];

    for (const section of sections) {

      const element = document.getElementById(section);

      if (element) {

        const top = element.offsetTop - 150;
        const bottom = top + element.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < bottom
        ) {
          this.activeSection = section;
        }

      }

    }

  }

  openPreview(imageUrl: string, title: string) {
    this.previewImage = imageUrl;
    this.previewTitle = title;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closePreview() {
    this.previewImage = null;
    this.previewTitle = '';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

}