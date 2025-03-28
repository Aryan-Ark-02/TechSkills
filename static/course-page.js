
document.addEventListener('DOMContentLoaded', function () {
    // Element selections
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('course-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const moduleHeaders = document.querySelectorAll('.module-header');
    const lessonItems = document.querySelectorAll('.lesson-item');
    const videoPlaceholder = document.getElementById('video-placeholder');
    const lessonVideo = document.getElementById('lesson-video');

    // Toggle sidebar on mobile - use consistent class name 'active'
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });

    // Module accordion functionality
    moduleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const moduleId = header.getAttribute('data-module');
            const content = document.getElementById(`${moduleId}-content`);
            const icon = header.querySelector('i');

            // Toggle active classes consistently
            header.classList.toggle('active');
            content.classList.toggle('active');

            // Update chevron icon
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Open the first module by default if no active lesson
    if (!document.querySelector('.lesson-item.active')) {
        const firstModuleContent = document.getElementById('module1-content');
        const firstModuleHeader = document.querySelector('[data-module="module1"]');

        if (firstModuleContent && firstModuleHeader) {
            firstModuleContent.classList.add('active');
            firstModuleHeader.classList.add('active');

            const icon = firstModuleHeader.querySelector('i');
            if (icon) {
                icon.classList.add('fa-chevron-up');
                icon.classList.remove('fa-chevron-down');
            }
        }
    } else {
        // Auto-expand the module containing the active lesson
        const activeLesson = document.querySelector('.lesson-item.active');
        if (activeLesson) {
            const moduleContent = activeLesson.closest('.module-content');
            if (moduleContent) {
                const moduleId = moduleContent.id.replace('-content', '');
                const moduleHeader = document.querySelector(`[data-module="${moduleId}"]`);

                moduleContent.classList.add('active');
                if (moduleHeader) {
                    moduleHeader.classList.add('active');

                    const icon = moduleHeader.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    }
                }
            }
        }
    }

    // Lesson selection
    lessonItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Allow link navigation
            const lessonUrl = item.getAttribute('href');
            if (lessonUrl) {
                window.location.href = lessonUrl;
            }

            // Update active lesson
            lessonItems.forEach(lesson => {
                lesson.classList.remove('active');
            });
            item.classList.add('active');

            // Update video title
            const lessonTitle = item.textContent;
            if (videoPlaceholder) {
                videoPlaceholder.textContent = lessonTitle;
            }

            // In a real application, you would load the appropriate video here
            // For this example, we'll just toggle between placeholder and video
            const shouldShowVideo = Math.random() > 0.5;

            if (shouldShowVideo && videoPlaceholder && lessonVideo) {
                videoPlaceholder.style.display = 'none';
                lessonVideo.style.display = 'block';
                lessonVideo.play();
            } else if (videoPlaceholder && lessonVideo) {
                videoPlaceholder.style.display = 'flex';
                lessonVideo.style.display = 'none';
                lessonVideo.pause();
            }

            // Update lesson content (in a real app, this would fetch the content)
            const lessonTitleElement = document.querySelector('.lesson-title');
            if (lessonTitleElement) {
                lessonTitleElement.textContent = lessonTitle;
            }
        });
    });

    // Play video when clicking on placeholder
    if (videoPlaceholder && lessonVideo) {
        videoPlaceholder.addEventListener('click', () => {
            videoPlaceholder.style.display = 'none';
            lessonVideo.style.display = 'block';
            lessonVideo.play();
        });
    }
});
