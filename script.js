// ------input change code of country ----------
let input = document.querySelector(".inp-js");
let sel = document.querySelector("#sel");
let US = document.querySelector(".US");
let RU = document.querySelector(".RU");
let UA = document.querySelector(".UA");

sel.addEventListener('change', () => {
    switch (sel.value) {
        case "one": input.value = "+1 ";
            break;
        case "two": input.value = "+7 ";
            break;
        case "three": input.value = "+380 ";
            break;
        default:
            input.value = "wron code";
    }
});

// ---------accordion--------

var acc = document.getElementsByClassName("accordion");

var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {

        // this.classList.toggle("active");
        if (this.classList.contains('active')) {
            document.querySelectorAll('.accordion').forEach((ell) => ell.classList.remove('active'))
        } else {
            document.querySelectorAll('.accordion').forEach((ell) => ell.classList.remove('active'))
            this.classList.add('active')
        }

        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            console.log(panel.style.maxHeight)
            document.querySelectorAll('.panel').forEach((ell) => ell.style.maxHeight = null)
        } else {
            document.querySelectorAll('.panel').forEach((ell) => ell.style.maxHeight = null)
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

        // this.childNodes[1].childNodes[3].classList.toggle('rotate');
        var arrow = this.childNodes[1].childNodes[3]
        if (arrow.classList.contains('rotate')) {
            document.querySelectorAll('.arrow').forEach((ell) => ell.classList.remove('rotate'))
        } else {
            document.querySelectorAll('.arrow').forEach((ell) => ell.classList.remove('rotate'))
            arrow.classList.add('rotate')
        }
    });
}

window.addEventListener('click', e => { // при клике в любом месте окна браузера
    const target = e.target // находим элемент, на котором был клик

    if (!target.closest('.accordion')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
        console.log("мимо") // то закрываем окно навигации, удаляя активный класс
        document.querySelectorAll('.accordion').forEach((ell) => ell.classList.remove('active'))
        document.querySelectorAll('.panel').forEach((ell) => ell.style.maxHeight = null)
        document.querySelectorAll('.arrow').forEach((ell) => ell.classList.remove('rotate'))
    }
    console.log(target.className)
})

//-----burge-------//
const burger = document.querySelector('.burger')
const burgerMenu = document.querySelector('.burger_menu');
const closeField = document.querySelector('.close-field');

function all_components_show() {
    burger.classList.toggle('burger_active');
    burgerMenu.classList.toggle('show');
    closeField.classList.add('show-close-field')
}
function all_components_hide() {
    burger.classList.toggle('burger_active');
    burgerMenu.classList.toggle('show');
    closeField.classList.toggle('show-close-field')
}
burger.addEventListener('click', function () { all_components_show() })
closeField.addEventListener('click', function () { all_components_hide() })


const AboutUs = document.querySelector('.about_js');
const Services = document.querySelector('.services_js');
const OurTeams = document.querySelector('.teams_js');
const ContactUs = document.querySelector('.contact_js');

AboutUs.addEventListener("click", function () { all_components_hide() })
Services.addEventListener("click", function () { all_components_hide() })
OurTeams.addEventListener("click", function () { all_components_hide() })
ContactUs.addEventListener("click", function () { all_components_hide() })

//               РАЗВЕРНУТАЯ ВЕРСИЯ
// const burger = document.querySelector('.burger')
// const burgerMenu = document.querySelector('.burger_menu');
// const closeField = document.querySelector('.close-field');

// burger.addEventListener('click', function () {
//     burger.classList.toggle('burger_ative');
//     burgerMenu.classList.toggle('show');
//     closeField.classList.add('show-close-field')
// })
// closeField.addEventListener('click', function () {
//     burger.classList.toggle('burger_active');
//     burgerMenu.classList.toggle('show');
//     closeField.classList.toggle('show-close-field')
// })

// const AboutUs = document.querySelector('.about_js');
// const Services = document.querySelector('.services_js');
// const OurTeams = document.querySelector('.teams_js');
// const ContactUs = document.querySelector('.contact_js');

// AboutUs.addEventListener("click", function () {
//     burger.classList.toggle('burger_active');
//     burgerMenu.classList.toggle('show');
//     closeField.classList.toggle('show-close-field')
// })
// Services.addEventListener("click", function () {
//     burger.classList.toggle('burger_active');
//     burgerMenu.classList.toggle('show');
//     closeField.classList.toggle('show-close-field')
// })
// OurTeams.addEventListener("click", function () {
//     burger.classList.toggle('burger_active');
//     burgerMenu.classList.toggle('show');
//     closeField.classList.toggle('show-close-field')
// })
// ContactUs.addEventListener("click", function () {
//     burger.classList.toggle('burger_active');
//     burgerMenu.classList.toggle('show');
//     closeField.classList.toggle('show-close-field')
// })


// -----------pop_up----------
const popupLinks = document.querySelectorAll('.popup_link');
const body = document.querySelector('body'); //для блокировки скрола внутри боди
const lockPadding = document.querySelectorAll('.lock_padding')

let unlock = true; //что-бы небыло двойных нажатий
const timeout = 800;//что-бы небыло двойных нажатий (значение взято из transition)

if (popupLinks.length > 0) {
    for (i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();//запрещаем при клике на ссылку перезагружать страницу
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close_popup');
if (popupCloseIcon.length > 0) {
    for (i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}
function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock(); //блочим скрол
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'));
            }
        }); 
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock'); //по этому классу скрываем скрол в popup

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        for (i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// <----------------------- PhotoSwipe---------------------------- -->

var pswpElement = document.querySelectorAll('.pswp')[0];
let allPictures = document.querySelectorAll('.btn');


for (let elem of allPictures) {
    elem.addEventListener('click', function () {
        var clickIndex = Array.prototype.indexOf.call(this.parentElement.children, this);
        console.log(this);
        console.log(clickIndex);


        // build items array
        var items = [
            {
                src: 'image/pic_1.png',
                w: 746,
                h: 365
            },
            {
                src: 'image/pic_2.png',
                w: 746,
                h: 365
            },
            {
                src: 'image/pic_3.png',
                w: 746,
                h: 365
            },
            // {
            //     src: 'https://placekitten.com/600/400',
            //     w: 600,
            //     h: 400
            // },
            // {
            //     src: 'https://placekitten.com/1200/900',
            //     w: 1200,
            //     h: 900,
            //     title: 'Image Caption'
            // },
            // {
            //     html: `<div class="box box_width" margin=" auto">
            //         <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            //             <circle cx="31.5" cy="31.5" r="31.5" fill="#D9D9D9" />
            //         </svg>
            //         <h3>High Quality</h3>
            //         <p class="p_grey_center">Customize your interior design into a dream place with the best
            //             designers and quality furniture. We try our best to
            //             fulfill your expectations.</p>
            // </div>`,
            //     w: 12,
            //     h: 90,
            // },
            // {
            //     html: `<div class="box box_width">
            //         <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            //             <circle cx="31.5" cy="31.5" r="31.5" fill="#D9D9D9" />
            //         </svg>
            //         <h3>Professional Designer</h3>
            //         <p class="p_grey_center">Customize your interior design into a dream place with the best
            //             designers and quality furniture. We try our best to
            //             fulfill your expectations.</p>
            //     </div>
            // </div>`
            // },
            // {
            //     html: `<div class="box box_width">
            //         <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            //             <circle cx="31.5" cy="31.5" r="31.5" fill="#D9D9D9" />
            //         </svg>
            //         <h3>The Best Services</h3>
            //         <p class="p_grey_center">Customize your interior design into a dream place with the best
            //             designers and quality furniture. We try our best to
            //             fulfill your expectations.</p>
            //     </div>`
            // },
        ];

        // define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: clickIndex //    если index: 0 то start at first slide
        };

        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    })
}


/*------------------- DropDownMenu in header--------------*/
/* https://www.youtube.com/watch?v=fa8BD1Q3YkE */

document.querySelector(".root_nav").onclick = function (event) {
    //console.log(event);
    // console.log(event.target.nodeName); 
    // console.log(event.target)
    // console.log(event.target.nextElementSibling);
    if (event.target.nodeName !== "SPAN") { return };

    closeAllSubmenu(event.target.nextElementSibling); //передаем текущюю менюшку(ul на котор происх событие)
    event.target.nextElementSibling.classList.toggle("sub_menu_active");
}

function closeAllSubmenu(current = null) {
    let parents = []; // все родители
    // console.log(parents)
    if (current) {   //если current был передан
        // console.dir(current);
        // console.log(current);
        let currentParent = current.parentNode;
        // console.log(currentParent)
        while (currentParent) {
            if (currentParent.classList.contains('root_nav')) { break };
            if (currentParent.nodeName === "UL") parents.push(currentParent);
            currentParent = currentParent.parentNode;
        }
    }
    const subMenu = document.querySelectorAll(".root_nav ul");
    Array.from(subMenu).forEach(item =>
    //закриваем не только текущую(item != current) но и всех родителей (!parents.includes(item))
    {
        if (item != current && !parents.includes(item)) {
            item.classList.remove('sub_menu_active')
        }
    });

}
window.addEventListener('click', e => { // при клике в любом месте окна браузера
    const target = e.target // находим элемент, на котором был клик
    // console.log(e)
    if (!target.closest('.root_nav')) { // если этот элемент или его родительские элементы не окно навигации
        document.querySelectorAll('.sub_menu_active').forEach((ell) => ell.classList.remove('sub_menu_active'))
    }
})





