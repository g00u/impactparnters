/* ======================================================
   1. Header Scroll Effect
   - 스크롤 시 헤더에 그림자를 주어 콘텐츠와 분리되게 합니다.
====================================================== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});
/* 스크롤 시 헤더에 클래스 추가 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ======================================================
   2. Scroll Reveal Animation (실무 필수!)
   - 스크롤을 내릴 때 섹션들이 스르륵 나타나는 효과입니다.
====================================================== */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들 선택
document.querySelectorAll('.section, .hero-inner').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

/* ======================================================
   3. Form Submission Handling
   - IR 제출 버튼 클릭 시 간단한 피드백을 줍니다.
====================================================== */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 실제 전송 로직 대신 성공 메시지 (나중에 서버 연결 시 수정 가능)
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = '제출 완료되었습니다.';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '#5885f7';
            contactForm.reset();
        }, 3000);
    });
}