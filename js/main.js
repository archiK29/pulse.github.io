/* когда мы обращаемся в js к документу мы обращаемся к структуре html */
$(document).ready(function(){
  /* при помощи библиотеки jQuery мы получаем определенный класс(.carousel__inner) */
  $('.carousel__inner').slick({
      speed: 1000,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="images/icons/prev-icon-slider.png" alt="previous icon"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="images/icons/next-icon-slider.png" alt="next icon"></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: true,
            arrows: false
          }
        },
      ]
  });

  /* вначале подставляем все табы ; далее говорим, что мы будем кликать на один из элементов внутри(у которого нет класса .._active) */
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    /* this - ссылается на тот элемент на который мы нажали */
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active').closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      /* к примеру мы нажали на второй класс и мы добавляем ему класс активности; siblings().removeClass('catalog__tab_active') - далее все соседние табы, которые не включают тот таб на который мы нажали, мы в них удаляем указанный класс */      
      /* следующая команда говорит, что я дожен найти ближайший элемент; далее находим нужные нам элементы и удаляем в них класс ..._active; eq($(this).index()) - получаем номер элемента на который мы нажали и определенному контенту под определенным номером добавляем класс активности */

  });
/*    добавление и удаление класса при нажатии на ссылку(подробнее); 
  each - перебор каждого элемента; 
  $('.catalog-item__link').each(function(i){
     мы будем ссылаться на каждую ссылку, которую мы перебираем 
    $(this).on('click', function(e) {
      отменяем стандартное поведение браузера
      e.preventDefault();
      указываем что будем происходить при клике на ссылку(подробнее)
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  }); */

/*   $('.catalog-item__back').each(function(i){
    мы будем ссылаться на каждую ссылку, которую мы перебираем 
    $(this).on('click', function(e) {
      отменяем стандартное поведение браузера
      e.preventDefault();
       указываем что будем происходить при клике на ссылку(подробнее)
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  }); */


  /* более короткая запись с использованием функции
     - это функция берет ссылку, которую мы ей передаем 
     и выполняет над ней операции  */
  function toggleSlide(item) {
    $(item).each(function(i){
    /* мы будем ссылаться на каждую ссылку, которую мы перебираем */
      $(this).on('click', function(e) {
        /* отменяем стандартное поведение браузера */
        e.preventDefault();
        /* указываем что будем происходить при клике на ссылку(подробнее) */
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  /* работаем с модальными окнами
    - обращаемся к элементам по дата атрибуту */

  $('[data-modal=consultation]').on('click', function(){
    /* проявится фон и модальное окно */
    $('.overlay, #consultation').fadeIn('slow');
  });

  /* нажимаем на крестик - закрываем модальное окно с фоном */
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #order, #gratitude').fadeOut('slow');
  });
  /* находим класс - нажимаем на элемент - проявляем модальное окно */
  $('.button_buy').on('click', function(){
    $('.overlay, #order').fadeIn('slow');
  });
  /* each - команда которая будет перебирать кнопки; i - номер элемента по порядку */
  $('.button_buy').each(function(i){
    /* this - та кнопка на которую я сейчас нажал */
    $(this).on('click', function(){
      /* внутри модального окна класс modal__descr(описание);
         - все что будет внутри конструкции .text($('.catalog-item__subtitle').eq(i).text()) - будет посдавляться внутрь модального окна  */
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      /* далее команда, которая будет показывать модальное окно */
      $('.overlay, #order').fadeIn('slow');
    });
  });

  /* настраиваем плагин для валидации форм */
  /* используем метод внутри подключенного нами плагина */
  // $('#consultation-form').validate();
  // /* для блока с уникальным идентификатором */
  // $('#consultation form').validate({
  //   rules:{
  //     name: {
  //       required: true,
  //       minlength: 2
  //     },
  //     phone: 'required',
  //     email: {
  //       required: true,
  //       email: true
  //     }
  //   },
  //   messages: {
  //     name: {
  //       required: "Пожалуйста, введите свое имя",
  //       minlength: jQuery.validator.format("Введите более {0} символов!")
  //     },
  //     phone: "Пожалуйста, введите свой номер телефона",
  //     email: {
  //       required: "Пожалуйста, введите свою почту",
  //       email: "Неправильно введен адрес почты"
  //   }
  // }
  // });
  // $('#order form').validate();

  /* оптимизация кода для более короткой записи */
  function validateForms(form){
    $(form).validate({
      rules:{
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите более {0} символов!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  /* работаем с маской ввода
     - отобразится маска ввода для телефона
     - обязательно нужно убрать type="number" в input */
     
  $('input[name=phone]').mask("+375(99) 999-99-99");

  /* технология AJAX - взаимодействие с сервером без перезагрузки страницы */
  /* отправка писем с сайта(урок 63) */
  /* берем все формы, которые есть на сайте; когда они будут сабмититься(когда все условия в импутах выполнены, когда прошли ве валидации) - эта форма отправляется(событие submit())  */
  $('form').submit(function(e){
    /* команда позволяет отменить стандартное поведение браузера(нужно для технологии AJAX) */
    e.preventDefault();

    /* записываем функцию валидатор(от багов)
      - если наша форма не прошла валидацию при помощи нашего плагина, то мы прекращаем функцию
      - т.е. код не дайтет до запроса на smart.php(мы просто прекратим этот код)
      - если форма не прошла валидацию мы ничего делать не будем(таким образом мы не сможем отправлять пустые данные из формы) */
    if(!$(this).valid()){
      return;
    }

    /* отправляем данные на сервер с помощью метода AJAX */
    $.ajax({
      /* настраиваем объект
         - отдаем данные(отправляем данные на почту post)
         - url - куда мы будем отправлять наш запрос
         - данные которые я хочу отправить на сервер */
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize() /* (this) - если мы отправили вторую форму, то мы будем работать с данными которые есть во воторой форме; .serialize() - метод подготавливает данные перед отправкой на сервер */
      /* далее после успешного выполнения(done) выполняем функцию */        
    }).done(function(){
      /* внутри этой формы мы находим инпуты и устанавливаем val в пустую строку(т.е. после отправки формы мы очистим все инпуты) */
      $(this).find("input").val("");

      $('#consultation, #order').fadeOut();
      $('.overlay, #gratitude').fadeIn('slow');


      /* все мои формы должны очиститься */
      $('form').trigger('reset');
    });
    return false; /* весь этот небольшой скрипт позволит отправлять данные на почту */
    /* далее переходим в smart.php */
  });

  /* создаем плавный скролл и прокрутку вверх страницы */
  /* обращаемся к окну браузера - далее js будет следить за событием скрола -  */
  $(window).scroll(function() {
    /* в условии ссылаемся на нашу страницу */
    if($(this).scrollTop() > 1600){
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 2000, function(){
        window.location.hash = hash;
      });
    } 
  });
  

  /* анимации от (wow.min.js) */
  new WOW().init();
  
});
