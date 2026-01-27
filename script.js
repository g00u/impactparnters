/* ======================================================
    1. Header Scroll Effect
    - 상단 네비게이션 투명도 및 높이 조절
====================================================== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        // 인라인 스타일 초기화 (CSS 클래스 우선)
        header.style.boxShadow = ''; 
        header.style.background = ''; 
    }
});

/* ======================================================
    2. Scroll Reveal Animation (통합 버전)
    - 요소들이 스크롤에 따라 순차적으로 스르륵 나타남
====================================================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // CSS의 .is-visible 클래스를 추가하여 애니메이션 실행
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

// 애니메이션을 적용할 모든 요소 선택
// .section 내부의 직계 자식들과 hero-inner 내부 요소들, 그리고 카드 아이템들
const elementsToReveal = document.querySelectorAll('.section > *, .process span, .logo-item, .hero-inner > *');

elementsToReveal.forEach((el, index) => {
    // 1. 초기 CSS 클래스 부여
    el.classList.add('reveal-init');
    
    // 2. 순차적 느낌을 위해 style 속성으로 delay 부여 (선택 사항)
    // index % 5를 통해 5개 단위로 끊어서 0.1초씩 늦게 나오게 함
    el.style.transitionDelay = `${(index % 5) * 0.1}s`;
    
    // 3. 관찰 시작
    revealObserver.observe(el);
});

/* ======================================================
    3. Form Submission Handling
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
            btn.style.background = ''; // 기존 CSS로 복구
            contactForm.reset();
        }, 3000);
    });
}

// 스크롤 시 요소 나타나기 (Intersection Observer 활용)
const observerOptions = {
    threshold: 0.1 // 요소가 10% 정도 보일 때 실행
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // 포트폴리오 그리드 내부의 아이템들인 경우 순차적으로 등장
            if (entry.target.classList.contains('logo-grid')) {
                const items = entry.target.querySelectorAll('.logo-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, index * 150); // 0.15초씩 간격을 두고 등장
                });
            } else {
                // 일반 요소들은 즉시 등장
                entry.target.classList.add('is-visible');
            }
            // 한 번 나타난 후에는 관찰 중단 (성능 최적화)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 관찰할 요소들 등록
document.querySelectorAll('.reveal-init, .logo-grid').forEach((el) => {
    observer.observe(el);
});