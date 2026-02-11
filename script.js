/* ======================================================
  1. 헤더 스크롤 효과 (Header Scroll Effect)
   - 스크롤 위치에 따라 헤더의 스타일을 변경
====================================================== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    // 스크롤이 10px 이상 내려가면 'scrolled' 클래스 추가
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ======================================================
2. 스크롤 애니메이션 및 숫자 카운팅 (통합)
====================================================== */
const countUp = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // 2초 동안 애니메이션
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.innerText = target.toLocaleString();
            clearInterval(timer);
        } else {
            el.innerText = Math.ceil(current).toLocaleString();
        }
    }, stepTime);
};

const observerOptions = {
    root: null,
    threshold: 0.15
};

const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // 숫자 카운팅 실행 (metrics-section 내부의 .count 요소인 경우)
            if (entry.target.classList.contains('metrics-section')) {
                const counters = entry.target.querySelectorAll('.count');
                counters.forEach(counter => countUp(counter));
            }

            // 포트폴리오 순차 등장
            if (entry.target.classList.contains('logo-grid')) {
                const items = entry.target.querySelectorAll('.logo-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, index * 100);
                });
            }

            observer.unobserve(entry.target);
        }
    });
};

// 새로운 metricsObserver 추가 
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 해당 섹션이 보이면 
            entry.target.classList.add('is-visible');
            
            //  숫자 카운팅 시작
            const counters = entry.target.querySelectorAll('.count');
            counters.forEach(counter => countUp(counter));
            
            metricsObserver.unobserve(entry.target); // 한 번만 실행
        }
    });
}, { threshold: 0.5 }); // 50% 보일 때 실행

// 대상 등록: HTML의 클래스명과 일치하는지 확인!
document.querySelectorAll('.metrics-section').forEach(section => {
    metricsObserver.observe(section);
});


const observer = new IntersectionObserver(revealCallback, observerOptions);

// 감시 대상 등록 (metrics-section 추가)
const elementsToWatch = document.querySelectorAll('.section > *, .process span, .logo-grid, .logo-item, .hero-inner > *, .metrics-section');

elementsToWatch.forEach((el) => {
    el.classList.add('reveal-init');
    observer.observe(el);
});


/* ======================================================
   3. 폼 제출 및 파일 업로드 UI
====================================================== */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = '제출 완료되었습니다.';
        btn.style.background = '#28a745';
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            contactForm.reset();
            selectedFiles = []; // 파일 목록 초기화
            renderFileList();
        }, 3000);
    });
}

const fileInput = document.getElementById('file');
const fileListContainer = document.createElement('ul');
fileListContainer.id = 'file-list-ui';
if(fileInput) fileInput.parentElement.appendChild(fileListContainer);

let selectedFiles = [];

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        selectedFiles = [...selectedFiles, ...files];
        renderFileList();
    });
}

function renderFileList() {
    fileListContainer.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const li = document.createElement('li');
        li.className = 'file-item'; // 스타일링을 위한 클래스
        li.innerHTML = `
            <span>📄 ${file.name}</span>
            <button type="button" class="file-remove-btn" onclick="removeFile(${index})">✕</button>
        `;
        fileListContainer.appendChild(li);
    });
}

window.removeFile = (index) => {
    selectedFiles.splice(index, 1);
    renderFileList();
};

/* ======================================================
4. 커스텀 커서 논리
====================================================== */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const interactiveElements = document.querySelectorAll("a, button, .logo-item");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-active");
            if(el.classList.contains('logo-item')) {
                cursorOutline.style.setProperty('--cursor-text', '"DETAIL"');
            }
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-active");
            cursorOutline.style.setProperty('--cursor-text', '""');
        });
    });
}

/* ======================================================
   5. 기타 (부드러운 스크롤 & Swiper)
====================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Swiper는 HTML에 해당 클래스가 있을 때만 실행하도록 조건부 처리
if(document.querySelector('.news-slider')){
    const newsSwiper = new Swiper('.news-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
}

/* ======================================================
   6. 로고 클릭 시 최상단 이동
====================================================== */
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault(); // 기본 링크 동작 방지
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 이동
        });
    });
}