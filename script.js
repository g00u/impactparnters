/* ======================================================
    1. Header Scroll Effect
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
    2. Scroll Reveal Animation (통합 최적화)
====================================================== */
// 요소가 화면에 나타나는지 관찰하는 '감시자' 설정
const observerOptions = {
    root: null,      // 브라우저 뷰포트 기준
    threshold: 0.15  // 요소가 15% 정도 보일 때 애니메이션 시작
};

const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // 1. 요소에 'is-visible' 클래스를 추가하여 CSS 애니메이션 실행
            entry.target.classList.add('is-visible');

            // 2. 만약 포트폴리오 그리드라면 내부 아이템들을 시간차(Stagger)를 두고 등장시킴
            if (entry.target.classList.contains('logo-grid')) {
                const items = entry.target.querySelectorAll('.logo-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, index * 100); // 0.1초 간격으로 순차적 등장
                });
            }

            // 3. 한 번 나타난 요소는 다시 감시할 필요가 없으므로 관찰 종료 (성능 최적화)
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(revealCallback, observerOptions);

// 감시할 대상들: 섹션 내 요소들, 프로세스 단계, 포트폴리오 그리드 및 아이템
const elementsToWatch = document.querySelectorAll('.section > *, .process span, .logo-grid, .logo-item, .hero-inner > *');

elementsToWatch.forEach((el) => {
    // 초기 투명도 상태 클래스 추가 (CSS에서 정의된 .reveal-init)
    el.classList.add('reveal-init');
    // 관찰 시작
    observer.observe(el);
});

/* ======================================================
    3. Form Submission
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
        }, 3000);
    });
}

/* ======================================================
    4. Custom Cursor Logic
====================================================== */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // 점 커서는 즉시 따라오게
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // 외곽선 커서는 부드러운 애니메이션 효과
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

const cursor = document.querySelector('.cursor-outline');
const logoItems = document.querySelectorAll('.logo-item');

logoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
        // 필요 시 카드별로 다른 문구 세팅 가능   
        cursor.style.setProperty('--cursor-text', '"DETAIL"'); 
    });
    
    item.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
    });
});




// 클릭 가능한 요소에 호버했을 때 커서 확장 효과
const interactiveElements = document.querySelectorAll("a, button, .logo-item");

interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-active");
    });
    el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-active");
    });
});

// 뉴스 슬라이더 초기화
const newsSwiper = new Swiper('.news-slider', {
  slidesPerView: 1,      // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 30,     // 슬라이드 사이 간격
  loop: true,           // 무한 반복
  navigation: {         // 화살표 설정
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {        // 화면 크기별 설정 (반응형)
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});