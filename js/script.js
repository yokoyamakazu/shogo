$(function(){
  //.accordion_oneの中の.accordion_headerがクリックされたら
  $('.accordion_header').click(function(){
    $(this).next('.accordion_inner').slideToggle();
    $(this).toggleClass("open"); //クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerが開いたり閉じたりする。
  });
});

//swiper
let mySwiper = new Swiper ('.swiper-container', {
  // ここからオプション
  loop: true,
  centeredSlides: true,
  slidesPerView: 2,
  spaceBetween: 30,

  autoplay: { //自動再生に関する設定
		delay: 5000, //単位はms（5000ms＝5秒）
		stopOnLastSlide: false,
		disableOnInteraction: false,
		reverseDirection: false
	},

  allowTouchMove: true, //スマホでのスワイプ、PCでのドラッグ操作を可能に

  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  breakpoints: {
    1440: { //1024以上の条件
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1025: { //1024以上の条件
      slidesPerView: 4,
      spaceBetween: 50,
    },
    769: { //768以上の条件
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});

//ページ内アンカー（問合せ）へのスムーススクロール
$(function(){
  // #で始まるa要素をクリックした場合に処理
  $('a[href="#section_contact"], a[href="#section_price"], a[href="#section_features"]').click(function(){
    var adjust = -60; // 移動先の縦を0px調整
    var speed = 400; // スクロールの速度（ミリ秒）
    var href= $(this).attr("href");// アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
    
    var target = $(href == "#" || href == "" ? 'html' : href); // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
    var position = target.offset().top + adjust; // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
    $('body,html').animate({scrollTop:position}, speed, 'swing'); // スムーススクロール linear（等速） or swing（変速）
    return false;
  });
});

$(function(){
  $('a[href="#"]').click(function(){
    var adjust = -60;
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href); 
    var position = target.offset().top + adjust;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

//AOS読み込み
AOS.init();


//フォーム：お問い合わせ完了メッセージを出す
$(document).ready(function () {

  $('#form').submit(function (event) {
    var formData = $('#form').serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSexxS_zsi_EziccYgqIeHXJciKQgY46QoC-WD0niwY1yJpDGA/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".end-message").slideDown();
          $(".button").fadeOut();
          //window.location.href = "thanks.html";
        },
        200: function () {
          $(".false-message").slideDown();
        }
      }
    });
    event.preventDefault();
  });

});

//フォーム：「プライバシーポリシーに同意します」に
//チェックがないとsubmitできないようにする
$(document).ready(function () {

  const $submitBtn = $('#send-button')
  $('#form input,#form textarea').on('change', function () {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $('#form #question').val() !== "" &&
      $('#form #agree').prop('checked') === true
    ) {
      $submitBtn.prop('disabled', false);

    } else {
      $submitBtn.prop('disabled', true);
    }
  });

});

//ハンバーガーメニュー 
$(function(){
  $('.burger-menu, .header-nav_musk, .hamburger_li').on('click', function () {
      $('.header-nav').fadeToggle(300);
      $('.header-nav_musk').fadeToggle(300);
      $('.burger-btn').toggleClass("cross");
      $('.menu-label').toggleClass("cross");
  })
});
