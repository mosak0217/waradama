/**
 * @modules : node_modulesフォルダまでの絶対パスのエイリアス
 * webpack.config.jsにて定義している
 */

import $ from "@modules/jquery";
import '@modules/slick-carousel';
import AOS from '@modules/aos';
import Modal from "@modules/micromodal";



("use strict");

// PC/SP判定
// スクロールイベント
// リサイズイベント
// スムーズスクロール

/* ここから */

const breakpoint = 640;
const mql = window.matchMedia(`screen and (max-width: ${breakpoint}px)`); //、MediaQueryListの生成
let deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP

// pagetop
let timer = null;
const $pageTop = $('#pagetop');
$pageTop.hide();

// スクロールイベント
$(window).on('scroll touchmove', function () {

  // スクロール中か判定
  if (timer !== false) {
    clearTimeout(timer);
  }

  // スクロール量が100pxを超えたら、200ms後にフェードイン
  timer = setTimeout(function () {
    if ($(this).scrollTop() > 100) {
      $('#pagetop').fadeIn('normal');
    } else {
      $pageTop.fadeOut();
    }
  }, 200);

  const scrollHeight = $(document).height();
  const scrollPosition = $(window).height() + $(window).scrollTop();
  const footHeight = parseInt($('#footer').innerHeight());


  if (scrollHeight - scrollPosition <= footHeight - 20) {
    // 現在の下から位置が、フッターの高さの位置にはいったら(bottom20px分を引いて調整)
    $pageTop.css({
      'position': 'absolute',
      'bottom': footHeight,
    });
  } else {
    $pageTop.css({
      'position': 'fixed',
      'bottom': '20px'
    });
  }

});


// リサイズイベント
const checkBreakPoint = function (mql) {
  deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP
  // → PC
  if (deviceFlag === 0) {
    console.log('PC');
  } else {
    // →SP
    console.log('SP');
  }

  deviceFlag = mql.matches;
}

// ブレイクポイントの瞬間に発火
mql.addListener(checkBreakPoint); //MediaQueryListのchangeイベントに登録

// 初回チェック
checkBreakPoint(mql);


// スムーズスクロール
// #で始まるアンカーをクリックした場合にスムーススクロール
$('a[href^="#"]').on('click', function () {
  const speed = 500;
  // アンカーの値取得
  const href = $(this).attr('href');
  // 移動先を取得
  const target = $(href == '#' || href == '' ? 'html' : href);
  // 移動先を数値で取得
  const position = target.offset().top;

  // スムーススクロール
  $('body,html').animate({
    scrollTop: position
  }, speed, 'swing');
  return false;
});

// slick



 
  $(".mv-slick").slick({
    autoplay: true,         //自動再生
	    autoplaySpeed: 3000,  //自動再生のスピード
	    speed: 800,		 //スライドするスピード
	    dots: true,//スライドしたのドット
	    arrows: true,          //左右の矢印
	    infinite: true,//スライドのループ
	    pauseOnHover: false,   //ホバーしたときにスライドを一時停止しない
      fade: true
  });





// aos
AOS.init();

AOS.init({
  easing: 'ease-out-back',
  duration: 1000
  });

  // タブ切り替え



// モーダルウインドウ

Modal.init({
  disableScroll: true,// モーダルが開いている間に、背景スクロールを無効にする。 
  awaitOpenAnimation: true,
  awaitCloseAnimation: true 
});
 




// ハンバーガーボタン

const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');

ham.addEventListener('click', function () {

  ham.classList.toggle('active');
  nav.classList.toggle('active');

});

$(document).on('click', '#js-nav', function() {
  nav.classList.toggle('active');
  ham.classList.toggle('active');
});

$('.header-nav__list-item a').on('click', function() {
  nav.classList.toggle('active');
  ham.classList.toggle('active');
});


$(function() {
	var Link = $("#tab li");
	var limit = 5;
	$(".contents").css('display','none');
	for(var i = 0 ; i < limit ; i++) {
		var limitPost = $(".contents")[i];
		$(limitPost).fadeIn();
	}
	$(Link).click(function(){
		$(Link).removeClass("active");
		$(this).addClass("active");
		var btnFilter = $(this).attr('data-filter');
		if (btnFilter == 'all') {
			$(".contents").css('display','none');
			for(i = 0 ; i < limit ; i++) {
				limitPost = $(".contents")[i];
				$(limitPost).fadeIn();
			}
		} else {
			$(".contents").css('display','none');
			for(i = 0 ; i < limit ; i++) {
				limitPost = $(".contents").filter('[data-category = "' + btnFilter + '"]')[i];
				$(limitPost).fadeIn();
			}
		}
	});
});

$(function() {
	var Link = $("#tab li");
	var limit = 5;
	$(".info-content").css('display','none');
	for(var i = 0 ; i < limit ; i++) {
		var limitPost = $(".info-content")[i];
		$(limitPost).fadeIn();
	}
	$(Link).click(function(){
		$(Link).removeClass("active");
		$(this).addClass("active");
		var btnFilter = $(this).attr('data-filter');
		if (btnFilter == 'all') {
			$(".info-content").css('display','none');
			for(i = 0 ; i < limit ; i++) {
				limitPost = $(".info-content")[i];
				$(limitPost).fadeIn();
			}
		} else {
			$(".info-content").css('display','none');
			for(i = 0 ; i < limit ; i++) {
				limitPost = $(".info-content").filter('[data-category = "' + btnFilter + '"]')[i];
				$(limitPost).fadeIn();
			}
		}
	});
});


