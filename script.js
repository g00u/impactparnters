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
2. 스크롤 애니메이션 (Scroll Reveal Animation)
   - IntersectionObserver API를 사용하여 요소가 화면에 
     보일 때 애니메이션을 발생
====================================================== */
// 요소가 화면에 나타나는지 관찰하는 '감시자' 설정
const observerOptions = {
    root: null,      // 브라우저 뷰포트 기준 관찰
    threshold: 0.15  // 요소가 15% 정도 보일 때 애니메이션 시작
};

const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
if (entry.isIntersecting) {
            // 1. 요소가 화면에 보이면 'is-visible' 클래스를 추가하여 
            //    CSS에서 정의한 fade-in 애니메이션을 실행합니다.
            entry.target.classList.add('is-visible');

            // 2. 포트폴리오 그리드(.logo-grid) 내의 아이템들은
            //    시간차(Stagger)를 두고 순차적으로 등장하게 합니다.
            if (entry.target.classList.contains('logo-grid')) {
                const items = entry.target.querySelectorAll('.logo-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, index * 100); // 0.1초 간격으로 순차적 등장
                });
            }

            // 3. 한 번 나타난 요소는 다시 애니메이션을 발생시킬 
            //    필요가 없으므로 관찰을 중지하여 성능을 최적화합니다.
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
   3. 폼 제출 처리 (Form Submission)
   - 폼 제출 시 페이지 새로고침을 막고 피드백을 제공
====================================================== */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        //페이지 새로고침 방지
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = '제출 완료되었습니다.';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = ''; //css 원래 스타일로 복원
            contactForm.reset(); //폼 초기화
        }, 3000);
    });
}

/* ======================================================
  3. 폼 제출 및 파일 업로드 (삭제 버튼 포함 버전)
====================================================== */
const fileInput = document.getElementById('file');
const fileLabel = document.querySelector('.file-upload label');
let selectedFiles = []; // 실제로 관리할 파일 배열

// 파일 리스트를 보여줄 컨테이너 생성
const fileListContainer = document.createElement('ul');
fileListContainer.id = 'file-list-ui';
fileInput.parentElement.appendChild(fileListContainer);

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        
        // 새로 선택한 파일들을 기존 배열에 추가 (중복 허용)
        selectedFiles = [...selectedFiles, ...files];
        renderFileList();
    });
}

// 파일 리스트를 화면에 그리는 함수
function renderFileList() {
    fileListContainer.innerHTML = ''; // 초기화

    selectedFiles.forEach((file, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>📄 ${file.name}</span>
            <button type="button" class="file-remove-btn" onclick="removeFile(${index})">✕</button>
        `;
        fileListContainer.appendChild(li);
    });
}

// 특정 파일을 삭제하는 함수
window.removeFile = (index) => {
    selectedFiles.splice(index, 1); // 배열에서 해당 파일 삭제
    renderFileList(); // 다시 그리기
};

/* ======================================================
4. 커스텀 커서 논리 (Custom Cursor Logic)
   - 마우스 커서를 두 개의 요소로 시각화하고 상호작용을 처리합니다.
====================================================== */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
// 터치 기기 체크
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if(!isTouchDevice){
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
}

// 포트폴리오 아이템 호버 시 특수 커서 효과
const logoItems = document.querySelectorAll('.logo-item');
logoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
        // CSS 변수를 활용하여 커서 내부에 문구 표시 ("DETAIL")
        cursorOutline.style.setProperty('--cursor-text', '"DETAIL"'); 
    });
    
    item.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
    });
});

// 클릭 가능한 요소(링크, 버튼) 호버 시 커서가 커지는 효과
const interactiveElements = document.querySelectorAll("a, button, .logo-item");

interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-active");
    });
    el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-active");
    });
});


/* ======================================================
   5. 뉴스 슬라이더 초기화 (Swiper Initialization)
   - Swiper.js 라이브러리를 사용하여 뉴스 섹션 슬라이드 구현
====================================================== */

//  ++ 메뉴 클릭 시 해당 섹션으로 부드럽게 이동
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


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