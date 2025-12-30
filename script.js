document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme === 'light');
    }

    themeToggle.addEventListener('click', () => {
        const isLight = body.getAttribute('data-theme') === 'light';

        if (isLight) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateIcon(false);
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateIcon(true);
        }
    });

    function updateIcon(isLight) {
        if (isLight) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // 2. Custom Cursor
    const cursor = document.getElementById('cursor-follower');

    // Only enable custom cursor on non-touch devices
    if (matchMedia('(pointer:fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'rgba(255,255,255,0.1)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));


    // 4. Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Simple Form Handling (Prevent Default)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sent!';
            btn.style.backgroundColor = 'green';

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // 7. Project Modal
    const modal = document.getElementById('projectModal');
    if (modal) {
        const modalImg = document.getElementById('modalImage');
        const modalCategory = document.getElementById('modalCategory');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const closeBtn = document.getElementById('modalClose');

        const projectCards = document.querySelectorAll('.project-card');

        // Data for specific projects
        const projectData = {
            "Living Veil Library": {
                images: [
                    "images/living-veil-library.jpg", // The main render
                    "images/library-sheet-1.jpg",     // Site Plan
                    "images/library-sheet-2.jpg",     // Plans
                    "images/library-sheet-3.jpg"      // Form Development
                ],
                description: "The 'Living Veil' represents a fusion of nature, knowledge, and community. The design introduces a permeable green veil of bamboo and integrated landscaping, allowing nature to flow through indoor and outdoor spaces.\n\nThe organic form, inspired by natural growth patterns, promotes openness, fluid circulation, and visual connectivity. Sustainable materials such as bamboo and wood express the library's ecological values."
            },
            "Experiential Museum": {
                images: [
                    "images/museum.jpg",
                    "images/museum-sheet.png"
                ],
                description: "The 'Capsular Cosmos Museum' is an immersive space museum inspired by planetary geometry. The architecture translates cosmic geometry into built form, creating an environment that reflects the mystery, scale, and movement of the universe.\n\nThe museum is composed of interconnected capsule-like volumes, each housing a distinct experiential zone. These volumes are linked through curved circulation paths, guiding visitors through a continuous narrative of space exploration."
            },
            "Sports Center": {
                images: [
                    "images/sports-center.jpg",
                    "images/sports-center-sheet-1.jpg",
                    "images/sports-center-sheet-2.png"
                ],
                description: "Use of curves in plan to promote fluid movement. The 'Sports Center' is designed as a modern reinterpretation of a historic gathering arena—an inclusive space that brings people together for sports, recreation, and community interaction while celebrating heritage through a contemporary architectural expression.\n\nThe concept is inspired by the Roman Colosseum, reinterpreted through a modern architectural approach. The curved built form echoes the Colosseum's circular geometry, symbolizing unity, movement, and the collective energy of sports activities."
            },
            "Public Cafeteria": {
                images: [
                    "images/cafeteria.jpg",
                    "images/cafeteria-sheet.jpg"
                ],
                description: "The cafeteria design for the sports center is inspired by the Roman Colosseum, interpreted through a modern architectural approach to create a vibrant social space for athletes and visitors.\n\nThe curved built form reflects the Colosseum's elliptical geometry, symbolizing movement, energy, and continuity. Arched openings and stone-textured surfaces reference classical Roman architecture while using glass and modern materials to ensure openness and light."
            },
            "School Design": {
                images: [
                    "images/school-design.jpg",
                    "images/school-sheet-1.jpg",
                    "images/school-sheet-2.jpg"
                ],
                description: "The school is conceived as a courtyard-centric learning environment, where built form and open space work together to enhance education. The central courtyard acts as the heart of the campus, encouraging interaction, visual connectivity, and natural ventilation.\n\nThe architectural language uses repetitive arches and brick facades, creating shaded circulation corridors that respond to the local climate while giving the school a strong identity. The design focuses on simplicity, durability, and student-friendly spaces."
            },
            "Architecture College Campus": {
                images: [
                    "images/architecture-college.jpg",
                    "images/college-sheet-1.png",
                    "images/college-sheet-2.png"
                ],
                description: "The architectural college is conceived as a courtyard-oriented academic campus, inspired by principles of climate responsive design, spatial hierarchy, and collaborative learning. The design emphasizes architecture as a learning experience itself, where built form, light, ventilation, and materiality become teaching tools.\n\nCentral courtyards act as the heart of the campus, promoting visual connectivity, social interaction, and passive cooling. The built mass is simple and rectilinear, expressing structural clarity and honesty of materials aligning with architectural pedagogy."
            }
            // Add other projects here as needed
        };

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.project-title').innerText;
                const category = card.querySelector('.project-category').innerText;
                const desc = card.querySelector('p').innerText;

                // Clear existing content
                modalImg.style.display = 'none'; // Hide the default single image
                const container = document.querySelector('.modal-image-container');
                container.innerHTML = ''; // Clear previous images

                // Helper to add arrows
                const addArrows = (dataImages) => {
                    const modalContent = document.querySelector('.modal-content');

                    // Clean up old arrows if any (from previous opens)
                    const oldArrows = modalContent.querySelectorAll('.slider-nav');
                    oldArrows.forEach(el => el.remove());

                    if (dataImages && dataImages.length > 1) {
                        const prevBtn = document.createElement('button');
                        prevBtn.className = 'slider-nav slider-prev';
                        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

                        const nextBtn = document.createElement('button');
                        nextBtn.className = 'slider-nav slider-next';
                        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

                        modalContent.appendChild(prevBtn);
                        modalContent.appendChild(nextBtn);

                        // BETTER: JS scroll logic
                        prevBtn.onclick = () => {
                            container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
                        };
                        nextBtn.onclick = () => {
                            container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
                        };

                        // Re-style for appending to content
                        prevBtn.style.position = 'absolute';
                        prevBtn.style.left = '2rem';
                        prevBtn.style.top = '50%';

                        nextBtn.style.position = 'absolute';
                        // Roughly 60% of width for the split
                        nextBtn.style.left = 'calc(60% - 4rem)';
                        nextBtn.style.right = 'auto';
                        nextBtn.style.top = '50%';

                        // Responsive check
                        if (window.innerWidth <= 900) {
                            nextBtn.style.left = 'auto';
                            nextBtn.style.right = '2rem';
                            // Top part is image (250px height)
                            prevBtn.style.top = '125px';
                            nextBtn.style.top = '125px';
                        }
                    }
                };

                const data = projectData[title];

                if (data && data.images) {
                    // Load multiple images from data
                    data.images.forEach(src => {
                        const img = document.createElement('img');
                        img.src = src;
                        img.className = 'modal-image';
                        img.alt = title;
                        container.appendChild(img);
                    });
                    // Add arrows
                    addArrows(data.images);
                } else {
                    // Fallback to the single image from the card
                    const imgSource = card.querySelector('.project-image') ? card.querySelector('.project-image').src : null;
                    const placeholder = card.querySelector('.project-image-placeholder');

                    if (imgSource) {
                        const img = document.createElement('img');
                        img.src = imgSource;
                        img.className = 'modal-image';
                        img.alt = title;
                        container.appendChild(img);
                    } else if (placeholder) {
                        // Create a placeholder div if no image
                        const div = document.createElement('div');
                        div.className = 'modal-image';
                        div.style.background = placeholder.style.background;
                        div.style.display = 'flex';
                        div.style.alignItems = 'center';
                        div.style.justifyContent = 'center';
                        div.innerHTML = '<p style="color:white; opacity:0.7;">No Preview</p>';
                        container.appendChild(div);
                    }
                }

                modalCategory.innerText = category;
                modalTitle.innerText = title;
                // Use custom description if available, else use the card's short description
                modalDesc.innerText = (data && data.description) ? data.description : (desc + "\n\n(Full project details comming soon.)");

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            const oldArrows = document.querySelectorAll('.slider-nav');
            oldArrows.forEach(el => el.remove());
        };

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
